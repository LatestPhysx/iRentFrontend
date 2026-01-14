iRent Morocco Project
Frontend Repo

## Car Details Page Setup

This section outlines the steps to integrate the Car Details page into the React project with `react-router-dom`.

### 1. Install Dependencies

First, ensure `react-router-dom` is installed:

```bash
npm install react-router-dom
```

### 2. Create the CarDetails Component

Create a new file `src/components/CarDetails.tsx` and add the provided HTML structure to it. This component will display the car's details, including images, specifications, availability, and host information.

### 3. Configure Routing in `App.tsx`

Update `src/App.tsx` to include `react-router-dom` for navigation. This involves:

- Importing `BrowserRouter as Router`, `Routes`, and `Route` from `react-router-dom`.
- Importing the `CarDetails` component.
- Wrapping the application with `<Router>`.
- Defining a `<Route>` for `/car-details` that renders the `CarDetails` component.
- Moving the common header and footer elements from `CarDetails.tsx` into `App.tsx` to ensure they are present across all pages.

An example route setup would look like this:

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarDetails from './components/CarDetails';

function App() {
  return (
    <Router>
      {/* Header and other common elements */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Example home route */}
        <Route path="/car-details" element={<CarDetails />} />
      </Routes>
      {/* Footer and other common elements */}
    </Router>
  );
}
```

### 4. Running the Application

After these changes, you can start your development server:

```bash
npm run dev
```

Navigate to `/car-details` in your browser to view the Car Details page.