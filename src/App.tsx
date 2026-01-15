import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
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

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
    console.log('Theme toggled. Is dark:', !isDark);
    console.log('HTML classes:', document.documentElement.classList.toString());
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 hover:bg-background-light dark:hover:bg-white/5 rounded-lg transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="material-symbols-outlined text-lg">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#141216] dark:text-white min-h-screen">
      {/* Top Navigation */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-[1200px] rounded-full bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl shadow-lg border border-white/20 dark:border-white/5 transition-all duration-300">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined text-lg">directions_car</span>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                DriveShare
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors" href="#">
                Become a Host
              </a>
              <a className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors" href="#">
                Browse Cars
              </a>
              <a className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors" href="#">
                Help
              </a>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <ThemeToggle />

            <div className="hidden sm:flex items-center gap-5">
              <a className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors" href="#">
                My Trips
              </a>
              <a className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors" href="#">
                Messages
              </a>
            </div>

            <div className="size-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-primary transition-colors">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZgqoVwWRc6NXW5CmIcWQoMQVY-pex16ch4ehkTYAXsLCUGU5i5VoXzLp2HvUFu8AdOEjLZxlwaWUTgeHfNGAe26cwfc9PYjkuDkTwXUlQqhq8yA1TpXQtL4CHFki8XhFST2xywHejEPAI8BiypMak0XeXHPaxMhbxjnla1bFQOAl_pGuoVgufqvzvFO3ZBwPJzXOf6DCemK4wpBy042mwJcpSskBqoS7SlDQ1X9cNJjB2rJP9CPH6tnpD6mpDB94OhKDeZ0jRsn8"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:scale-105 transition-all">
              List your car
            </button>
          </div>
        </div>
      </div>

      <BrowserRouter>
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
      </BrowserRouter>

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
