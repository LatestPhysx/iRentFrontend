import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

type Theme = 'light' | 'dark'
const getInitialTheme = (): Theme => 'light'

export default function Layout() {
    const [theme, setTheme] = useState<Theme>(getInitialTheme)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()

    // Theme Logic
    useEffect(() => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location])

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-body">
            {/* Header */}
            <header className="absolute top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
                <div className="pointer-events-auto max-w-5xl w-full mx-auto px-6 py-3 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/70 shadow-lg shadow-black/10 backdrop-blur-md flex items-center justify-between gap-8">
                    <Link to="/" className="flex items-center gap-2 cursor-pointer relative z-50">
                        <div className="p-2 bg-primary rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl">directions_car</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">iRent</h1>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center justify-between gap-8 flex-1">
                        <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
                            <Link className="hover:text-primary transition-colors" to="/cars">
                                Become a Host
                            </Link>
                            <Link className="hover:text-primary transition-colors" to="/cars">
                                Browse Cars
                            </Link>
                            <a className="hover:text-primary transition-colors" href="#">
                                Help
                            </a>
                        </div>

                        {!isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-400"
                                    onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
                                    title="Toggle Mode"
                                >
                                    <span className="material-symbols-outlined dark-mode-icon">dark_mode</span>
                                    <span className="material-symbols-outlined light-mode-icon">light_mode</span>
                                </button>
                                <button
                                    type="button"
                                    className="text-sm font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsLoggedIn(true)}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                >
                                    Get Started
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-400"
                                    onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
                                    title="Toggle Mode"
                                >
                                    <span className="material-symbols-outlined dark-mode-icon">dark_mode</span>
                                    <span className="material-symbols-outlined light-mode-icon">light_mode</span>
                                </button>
                                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">My Trips</a>
                                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Messages</a>
                                <div className="relative">
                                    <div
                                        className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        title="User Menu"
                                    >
                                        <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" />
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden py-1 z-50">
                                            <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Profile</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">Settings</a>
                                            <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                                            <button
                                                onClick={() => {
                                                    setIsLoggedIn(false)
                                                    setIsDropdownOpen(false)
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-primary/90 transition-all hidden lg:block"
                                >
                                    List your car
                                </button>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 text-slate-800 dark:text-slate-100"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="material-symbols-outlined !text-3xl">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </header>

            {/* Main Content (Outlet) */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="w-full bg-footer-light dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-16">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-1.5 bg-primary rounded text-white">
                                    <span className="material-symbols-outlined text-lg">directions_car</span>
                                </div>
                                <span className="font-bold text-lg tracking-tight font-display">iRent</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                                The world&apos;s largest car sharing marketplace where you can book any car you
                                want, wherever you want it.
                            </p>
                        </div>

                        <div>
                            <h5 className="font-bold text-sm uppercase tracking-wider mb-6 text-slate-900 dark:text-slate-100 font-display">
                                Company
                            </h5>
                            <ul className="space-y-4">
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">About</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Careers</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Press</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Team</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold text-sm uppercase tracking-wider mb-6 text-slate-900 dark:text-slate-100 font-display">
                                Rent
                            </h5>
                            <ul className="space-y-4">
                                <li><Link className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" to="/cars">Search</Link></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">How it works</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Rental Policies</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Destinations</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold text-sm uppercase tracking-wider mb-6 text-slate-900 dark:text-slate-100 font-display">
                                Host
                            </h5>
                            <ul className="space-y-4">
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">List your car</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Hosting tips</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Insurance &amp; protection</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold text-sm uppercase tracking-wider mb-6 text-slate-900 dark:text-slate-100 font-display">
                                Support
                            </h5>
                            <ul className="space-y-4">
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Help Center</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Trust &amp; Safety</a></li>
                                <li><a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Contact Support</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                            © 2024 iRent Marketplace. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-lg">language</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-lg">public</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-lg">share</span></a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Nav Overlay (At Body Level) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white dark:bg-slate-950 z-[100] flex flex-col p-6 md:hidden animate-in fade-in duration-200 overflow-y-auto">
                    <div className="flex justify-end mb-8">
                        <button
                            className="p-2 text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="material-symbols-outlined !text-2xl">close</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-6 text-xl font-medium text-slate-800 dark:text-slate-100">
                        <Link to="/cars" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary">Become a Host</Link>
                        <Link to="/cars" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary">Browse Cars</Link>
                        <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary">Help</a>
                        <hr className="border-slate-200 dark:border-slate-800" />

                        <button
                            type="button"
                            className="flex items-center gap-3 text-left w-full hover:text-primary transition-colors"
                            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
                        >
                            <span className="material-symbols-outlined">
                                {theme === 'light' ? 'dark_mode' : 'light_mode'}
                            </span>
                            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                        </button>

                        {!isLoggedIn ? (
                            <div className="flex flex-col gap-4 mt-4">
                                <button
                                    type="button"
                                    className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                                    onClick={() => {
                                        setIsLoggedIn(true)
                                        setIsMobileMenuOpen(false)
                                    }}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    className="w-full py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Get Started
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 mt-4">
                                <div className="flex items-center gap-3 mb-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                        <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">Felix User</span>
                                        <span className="text-xs text-slate-500">View Profile</span>
                                    </div>
                                </div>
                                <a href="#" className="flex items-center gap-3 hover:text-primary"><span className="material-symbols-outlined">commute</span> My Trips</a>
                                <a href="#" className="flex items-center gap-3 hover:text-primary"><span className="material-symbols-outlined">chat</span> Messages</a>
                                <button
                                    onClick={() => {
                                        setIsLoggedIn(false)
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="flex items-center gap-3 text-red-600 mt-2 hover:text-red-700"
                                >
                                    <span className="material-symbols-outlined">logout</span>
                                    Sign Out
                                </button>
                                <button
                                    type="button"
                                    className="w-full mt-4 py-3 rounded-xl bg-primary text-white font-bold shadow-lg"
                                >
                                    List your car
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
