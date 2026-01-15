import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Theme = 'light' | 'dark'

const HomePage = () => {
  const [theme, setTheme] = useState<Theme>('light')

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = window.localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    } else {
      setTheme('light')
    }
  }, [])

  // Apply theme class to the root html element
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-sans text-[#141216] dark:text-white transition-colors duration-300">
      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto px-6 py-3 rounded-full bg-white/80 dark:bg-[#211d29]/80 backdrop-blur-md border border-[#e0dde3] dark:border-[#332e3d] shadow-lg flex items-center gap-8">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="text-primary">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-lg font-display font-bold tracking-tight">
            AutoShare
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-semibold text-[#141216] dark:text-[#e0dde3] hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-[#141216] dark:text-[#e0dde3] hover:text-primary transition-colors"
          >
            Browse
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-[#141216] dark:text-[#e0dde3] hover:text-primary transition-colors"
          >
            About
          </Link>
        </div>

        {/* Right: Search Input and Profile/Action Icons */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="hidden lg:flex items-center relative">
            <span className="absolute left-3 text-[#726a81] material-symbols-outlined text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#141216] dark:text-white placeholder:text-[#a199b0] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-48"
            />
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#726a81] hover:text-primary shadow-sm transition-colors"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Profile Icon */}
          <Link
            to="/auth"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#726a81] hover:text-primary shadow-sm transition-colors"
            aria-label="Profile"
          >
            <span className="material-symbols-outlined text-[18px]">
              person
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
            Welcome to AutoShare
          </h1>
          <p className="text-xl text-[#726a81] dark:text-[#a199b0] max-w-xl mx-auto">
            Your trusted platform for car rentals. Find the perfect vehicle for
            your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              Get Started
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-[#e0dde3] dark:border-[#332e3d] text-[#141216] dark:text-[#e0dde3] font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

