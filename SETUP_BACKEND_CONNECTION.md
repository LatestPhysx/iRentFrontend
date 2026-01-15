# Frontend-Backend Connection Setup in ECS

## Overview
This setup connects your React frontend and Spring Boot backend through a shared Application Load Balancer (ALB) in AWS ECS.

## Architecture

```
                    ┌──────────────────┐
                    │   Application    │
                    │  Load Balancer   │
                    │  (Port 80)       │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼────────┐       ┌───────▼────────┐
        │   Frontend     │       │    Backend     │
        │   ECS Service  │       │  ECS Service   │
        │   (Port 80)    │       │  (Port 8080)   │
        │   nginx        │       │  Spring Boot   │
        └────────────────┘       └────────────────┘
```

## Routing Rules

The ALB routes traffic based on path patterns:

- **`/api/*`** → Backend ECS Service (Spring Boot on port 8080)
- **`/actuator/*`** → Backend ECS Service (health checks)
- **`/`** (default) → Frontend ECS Service (React SPA on port 80)

## What Changed

### 1. Terraform Infrastructure (`terraform/main.tf`)

**Added:**
- Frontend ECS Task Definition and Service
- Frontend Target Group for ALB
- Frontend Security Group (port 80)
- ALB Listener Rules for path-based routing
- Outputs for frontend service details and backend API URL

### 2. Backend Changes

**Added CORS Configuration** ([WebConfig.java](../iRent-Backend/mvp/src/main/java/com/irant/mvp/config/WebConfig.java)):
- Allows all origins (*)
- Permits all HTTP methods
- Required for browser-based API calls from frontend

### 3. Frontend Changes

**Created API Client** ([src/api/client.ts](src/api/client.ts)):
- Reads `VITE_API_URL` environment variable
- Falls back to `http://localhost:8080/api` for local development
- Provides methods: `get`, `post`, `put`, `delete`

**Updated Dockerfile**:
- Accepts `VITE_API_URL` build argument
- Injects API URL at build time

### 4. CI/CD Pipeline Updates

**Frontend Pipeline** ([.github/workflows/frontend-ci-cd.yml](.github/workflows/frontend-ci-cd.yml)):
- Passes `BACKEND_API_URL` secret as `VITE_API_URL` build arg during Docker build
- Uses OIDC for AWS authentication (same as backend)

**Backend Pipeline**: No changes needed - already configured with OIDC

## Setup Instructions

### Step 1: Apply Terraform Changes

```bash
cd iRent-Backend/terraform
terraform init
terraform apply
```

**Note the outputs**, especially:
- `alb_dns_name`: Your application URL
- `backend_api_url`: The API URL for frontend to use

### Step 2: Configure GitHub Secrets

For **Frontend Repository** (`iRentFrontend`), add these secrets:

```
AWS_REGION: us-east-1 (or your region)
ECS_CLUSTER: api-service-cluster (from terraform output: ecs_cluster_name)
ECS_SERVICE: api-service-frontend-service (from terraform output: frontend_service_name)
ECS_TASK_DEFINITION: api-service-frontend-task (from terraform output: frontend_task_definition_family)
```

**Note:** `BACKEND_API_URL` secret is **NOT needed** - the backend ALB DNS is automatically passed to frontend at runtime via the `VITE_ALB_DNS` environment variable.

For **Backend Repository** (`iRent-Backend`), ensure these exist:

```
AWS_REGION: us-east-1
ECS_CLUSTER: api-service-cluster
ECS_SERVICE: api-service-service
ECS_TASK_DEFINITION: api-service-task
```

### Step 3: Update IAM Trust Policy (if needed)

If you have a separate frontend repo, add it to the GitHub OIDC trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::954976302452:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": [
            "repo:bouyoussef-aymen/iRent-Backend:ref/heads/*",
            "repo:bouyoussef-aymen/iRent-Backend:pull_request*",
            "repo:bouyoussef-aymen/iRentFrontend:ref/heads/*",
            "repo:bouyoussef-aymen/iRentFrontend:pull_request*"
          ]
        }
      }
    }
  ]
}
```

### Step 4: Deploy

1. **Deploy Backend** (if changes made):
   ```bash
   cd iRent-Backend
   git add .
   git commit -m "Add CORS configuration"
   git push origin feature/pipeline
   ```

2. **Deploy Frontend**:
   ```bash
   cd iRentFrontend
   git add .
   git commit -m "Add backend API integration"
   git push origin feature/pipeline
   ```

### Step 5: Test the Connection

Once both pipelines complete:

1. Visit `http://<alb_dns_name>` - Should show React frontend
2. Frontend can call APIs at `http://<alb_dns_name>/api/*`
3. Backend health check: `http://<alb_dns_name>/actuator/health`

## Local Development

### Backend
```bash
cd iRent-Backend/mvp
mvn spring-boot:run
```
Runs on `http://localhost:8080`

### Frontend
```bash
cd iRentFrontend
npm install
npm run dev
```
Runs on `http://localhost:5173` and will call backend at `http://localhost:8080/api`

## Using the API Client in Frontend

The API client automatically reads the ALB DNS name from the `VITE_ALB_DNS` environment variable injected by ECS:

```typescript
import { apiClient } from './api/client';

// Example: Fetch data
const data = await apiClient.get('/users');

// Example: Create resource
const newUser = await apiClient.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Example: Update resource
const updated = await apiClient.put('/users/1', { name: 'Jane Doe' });

// Example: Delete resource
await apiClient.delete('/users/1');
```

In production (ECS), the client automatically uses the ALB DNS to call `/api/*`.
In local development, it defaults to `http://localhost:8080/api`.

## Troubleshooting

### CORS Errors
- Check that backend `WebConfig.java` is present and compiled
- Verify backend service is running: `aws ecs describe-services --cluster <cluster> --services <backend-service>`

### 404 Errors
- Check ALB listener rules are configured correctly
- Verify target groups have healthy targets
- Check security group rules allow ALB → ECS traffic

### Frontend can't reach backend
- Verify `BACKEND_API_URL` secret is set correctly in frontend repo
- Check that frontend Docker image was built with correct `VITE_API_URL`
- Inspect frontend container logs: `aws logs tail /ecs/api-service --follow`

### ECS Service Not Starting
- Check CloudWatch logs: `aws logs tail /ecs/api-service --follow`
- Verify task definition container image URI is correct
- Check security groups and network configuration

## Next Steps

1. Add authentication/authorization (JWT, OAuth)
2. Enable HTTPS with ACM certificate on ALB
3. Configure proper CORS origins (replace `*` with specific domain)
4. Add API versioning (`/api/v1/*`)
5. Set up CloudWatch alarms for service health
6. Implement proper error handling in API client
