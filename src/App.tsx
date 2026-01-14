import { Routes, Route, Link } from 'react-router-dom';
import CarDetails from './components/CarDetails';
import { useTheme } from './hooks/useTheme';

const Home = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold">Welcome to DriveShare!</h1>
      <p className="mt-4">This is the homepage. You can navigate to the car details page.</p>
      <Link to="/car-details" className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
        View Car Details
      </Link>
    </div>
  );
};

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
    // Debug: log the current state
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
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#f2f1f4] dark:border-white/10">
          <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">directions_car</span>
                </div>
                <span className="text-xl font-bold tracking-tight">DriveShare</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Browse Cars</a>
                <a className="text-sm font-medium hover:text-primary transition-colors" href="#">How it works</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a className="text-sm font-medium px-4 py-2 hover:bg-background-light dark:hover:bg-white/5 rounded-lg transition-colors" href="#">List your car</a>
              <ThemeToggle />
              <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20">Sign In</button>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car-details" element={<CarDetails />} />
        </Routes>

        <footer className="bg-white dark:bg-background-dark border-t border-[#f2f1f4] dark:border-white/10 mt-20 py-12">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-6 bg-primary rounded flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-xs">directions_car</span>
                </div>
                <span className="text-lg font-bold">DriveShare</span>
              </div>
              <p className="text-sm text-[#726a81] max-w-sm">The world's largest peer-to-peer car sharing marketplace where you can book any car you want, wherever you want it.</p>
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
            <p>© 2023 DriveShare. All rights reserved.</p>
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