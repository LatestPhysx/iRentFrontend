iRent Morocco Frontend

This project includes:

DriveShare-style Car Details page (from Sabir/Car_Detail branch).

AutoShare-style Login / Register flow (from Alaa/Home_Page and main branch).

It’s built with React + Vite + Tailwind CSS v4 and uses react-router-dom for routing.

1. Install Dependencies

From the project root:

npm install


Install routing (if not installed yet):

npm install react-router-dom

2. Running the Development Server
npm run dev


Open the URL printed in the terminal (usually http://localhost:5173) in your browser.

3. Pages / Routes
DriveShare Car Details

Home page (DriveShare-style): /drive-home

File: src/App.tsx → Home component

Contains a welcome message and link to car details.

Car Details page: /car-details

File: src/components/CarDetails.tsx

Displays car images, specifications, availability, and host info.

AutoShare Auth Flow

Landing/HomePage: /

File: HomePage.tsx

Simple branded landing screen with a button linking to auth.

AuthPage (Login / Register): /auth

File: AuthPage.tsx

Includes:

Sign In

Create account – Account Type (Regular User / Rental Company)

Register – Basic Info

Register – Final Details

Uses React state to manage multi-step flow.

Owner / Agency Pages

/owner-dashboard → OwnerDashboard

/owner/cars → MyCars

/owner/cars/new → AddCarBasic

/owner/cars/new/media → AddCarMedia

/owner/cars/new/pricing → AddCarPricing

/owner/bookings → OwnerBookings

/owner/agency-profile → AgencyProfile

4. Styling and Design

Tailwind Configuration (src/index.css):

Imports Tailwind: @import "tailwindcss";

Uses theme tokens for:

Colors: primary, accent, background-light, background-dark

Fonts: display (Space Grotesk), sans (Noto Sans, Inter)

Border radius: lg, xl, full

Sets body styles for full height, font family, and responsiveness.

Adds .material-symbols-outlined rule for icons.

Fonts and Icons (index.html):

Google Fonts:

Space Grotesk (display headings)

Noto Sans (body text)

Inter / Montserrat (additional headings and text)

Material Symbols Outlined for icons.

5. Editing UI / Components

Auth flow: Edit JSX in src/AuthPage.tsx.

DriveShare CarDetails: Edit src/components/CarDetails.tsx.

Theme / Colors / Fonts: Update src/index.css under @theme.

Navigation / Routes: Update src/App.tsx.

6. Notes

DriveShare pages use /drive-home and /car-details to avoid conflict with main / HomePage.

Theme toggle and navbar/footer are applied globally.

All routes work in a single <BrowserRouter> wrapper.

Auth flow and Car Details can coexist and be accessed independently.