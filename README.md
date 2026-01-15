## iRent Morocco Frontend

This project currently renders the AutoShare-style **Login / Register** flow built with **React + Vite + Tailwind CSS v4**.

### How to run the project

1. **Install dependencies**
   - In the project root run:

   ```bash
   npm install
   ```

2. **Start the dev server**
   - From the same folder run:

   ```bash
   npm run dev
   ```

3. **Open the app**
   - Open the URL printed in the terminal (usually `http://localhost:5173`) in your browser.

### Auth page structure (Login / Register)

- **Entry point**
  - `App.tsx` renders the auth experience by returning the `AuthPage` component.

- **Auth UI component**
  - `AuthPage.tsx` contains the full design of the AutoShare auth flow:
    - **Sign In** screen.
    - **Create an account – Account Type** (Regular User / Car Rental Company).
    - **Register – Basic Info**.
    - **Register – Final Details**.
  - The component internally manages which step is visible using React state so everything stays on one page, exactly like the provided design.

### Styling and design details

- **Tailwind configuration (CSS-only, Tailwind v4)**
  - `src/index.css`:
    - Imports Tailwind: `@import "tailwindcss";`
    - Defines theme tokens with `@theme` to match the Figma/HTML:
      - **Colors**: `primary`, `background-light`, `background-dark`.
      - **Fonts**: `display` (`Space Grotesk`), `sans` (`Noto Sans`).
      - **Border radius**: `lg`, `xl`, `full`.
    - Sets base `body` styles (no centering, full-height page, correct font family).
    - Adds the `.material-symbols-outlined` rule so Material Symbols icons render correctly.

- **Global HTML head / fonts / icons**
  - `index.html`:
    - Sets `<html lang="en" class="light">` to match the design’s light-mode default.
    - Adds Google Fonts for:
      - `Space Grotesk` (display headings).
      - `Noto Sans` (body text).
    - Adds the **Material Symbols Outlined** font for the icon set used in the design.

- **Tailwind utility classes**
  - All layout and spacing are controlled with Tailwind classNames inside `AuthPage.tsx` and mirror the provided static HTML exactly (sections, paddings, font sizes, colors, and shadows).

### How to edit the Auth UI

- To tweak text, labels, or button behavior:
  - Open `src/AuthPage.tsx` and edit the JSX directly.
- To change colors, fonts, or radii globally while keeping the structure:
  - Update the tokens in `src/index.css` under the `@theme` block.
- To hook up real backend logic later:
  - Replace the current dummy `onClick` handlers and form `onSubmit` with your API calls or router navigation, keeping the JSX / Tailwind classes the same so the design stays identical.

- To change colors, fonts, or radii globally while keeping the structure:
