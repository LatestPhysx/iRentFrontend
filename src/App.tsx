import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

// Layout & Pages from Home_Page / main
import Layout from './components/Layout';
import Home from './pages/Home';
import AllCars from './pages/AllCars';

// DriveShare pages
import CarDetails from './components/CarDetails';

// Main branch pages
import AuthPage from './AuthPage';
import HomePage from './HomePage';
import OwnerDashboard from './OwnerDashboard';
import MyCars from './MyCars';
import AddCarBasic from './AddCarBasic';
import AddCarMedia from './AddCarMedia';
import AddCarPricing from './AddCarPricing';
import OwnerBookings from './OwnerBookings';
import AgencyProfile from './AgencyProfile';

// Optional: DriveShare-style homepage
const DriveHome = () => (
  <div className="max-w-[1200px] mx-auto px-6 py-8">
    <h1 className="text-4xl font-bold">Welcome to DriveShare!</h1>
    <p className="mt-4">This is the homepage. You can navigate to the car details page.</p>
    <Link
      to="/car-details"
      className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
    >
      View Car Details
    </Link>
  </div>
);



function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#141216] dark:text-white min-h-screen">


      <Routes>
        {/* DriveShare pages */}
        <Route path="/drive-home" element={<DriveHome />} />
        <Route path="/car-details" element={<CarDetails />} />

        {/* Home_Page / AutoShare routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<AllCars />} />
        </Route>

        {/* Main branch routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/cars" element={<MyCars />} />
        <Route path="/owner/cars/new" element={<AddCarBasic />} />
        <Route path="/owner/cars/new/media" element={<AddCarMedia />} />
        <Route path="/owner/cars/new/pricing" element={<AddCarPricing />} />
        <Route path="/owner/bookings" element={<OwnerBookings />} />
        <Route path="/owner/agency-profile" element={<AgencyProfile />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark border-t border-[#f2f1f4] dark:border-white/10 mt-20 py-12">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xs">directions_car</span>
              </div>
              <span className="text-lg font-bold">DriveShare</span>
            </div>
            <p className="text-sm text-[#726a81] max-w-sm">
              The world's largest peer-to-peer car sharing marketplace where you can book any car you want, wherever you want it.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-widest">Company</h5>
            <ul className="space-y-2 text-sm text-[#726a81]">
              <li><a className="hover:text-primary" href="#">About Us</a></li>
              <li><a className="hover:text-primary" href="#">Press</a></li>
              <li><a className="hover:text-primary" href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-widest">Support</h5>
            <ul className="space-y-2 text-sm text-[#726a81]">
              <li><a className="hover:text-primary" href="#">Help Center</a></li>
              <li><a className="hover:text-primary" href="#">Safety</a></li>
              <li><a className="hover:text-primary" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 pt-12 mt-12 border-t border-[#f2f1f4] dark:border-white/10 text-xs text-[#726a81] flex flex-col md:flex-row justify-between gap-4">
          <p>© 2025 DriveShare. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:underline" href="#">Privacy Policy</a>
            <a className="hover:underline" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
