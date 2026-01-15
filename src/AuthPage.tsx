import { useEffect, useState, type FormEvent } from 'react'

type View =
  | 'sign-in'
  | 'register-account-type'
  | 'register-basic-info'
  | 'register-final-details'

type Theme = 'light' | 'dark'

interface RegisterData {
  role: 'ROLE_RENTER' | 'ROLE_VEHICLE_OWNER' | null
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  country: string
  city: string
  agreeToTerms: boolean
}

const LOCATIONS: Record<string, { label: string; cities: string[]; phonePlaceholder: string }> = {
  us: {
    label: 'United States',
    cities: ['New York', 'Los Angeles', 'Chicago'],
    phonePlaceholder: '+1 (555) 000-0000'
  },
  ca: {
    label: 'Canada',
    cities: ['Toronto', 'Vancouver', 'Montreal'],
    phonePlaceholder: '+1 (555) 000-0000'
  },
  uk: {
    label: 'United Kingdom',
    cities: ['London', 'Manchester', 'Birmingham'],
    phonePlaceholder: '+44 7911 123456'
  },
  au: {
    label: 'Australia',
    cities: ['Sydney', 'Melbourne', 'Brisbane'],
    phonePlaceholder: '+61 400 123 456'
  },
  ma: {
    label: 'Morocco',
    cities: ['Casablanca', 'Rabat', 'Marrakech'],
    phonePlaceholder: '+212 600-000000'
  }
}

interface LoginData {
  email: string
  password: string
}

const AuthPage = () => {
  const [view, setView] = useState<View>('sign-in')
  const [theme, setTheme] = useState<Theme>('light')

  const [registerData, setRegisterData] = useState<RegisterData>({
    role: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: '',
    city: '',
    agreeToTerms: false
  })

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  })

  // Initialize theme from localStorage (default to light to match design)
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

  const goToRegister = () => setView('register-account-type')
  const goToSignIn = () => setView('sign-in')
  const goToBasicInfo = () => {
    if (!registerData.role) {
      alert('Please select an account type')
      return
    }
    setView('register-basic-info')
  }
  const goToFinalDetails = () => {
    if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password) {
      alert('Please fill in all required fields')
      return
    }
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    setView('register-final-details')
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value, checked } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setRegisterData(prev => {
      // If country changes, reset city
      if (name === 'country') {
        return {
          ...prev,
          country: value,
          city: ''
        }
      }
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Login Payload:', loginData)
    // TODO: Connect to backend API
  }

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!registerData.agreeToTerms) {
      alert('You must agree to the Terms of Service and Privacy Policy')
      return
    }

    const payload = {
      ...registerData,
      phoneNumber: registerData.phoneNumber || null // Send null if empty (matches DB unique constraint)
    }

    console.log('Register Payload:', payload)
    // TODO: Connect to backend API
  }

  if (view === 'sign-in') {
    return (
      <div className="bg-background-light dark:bg-background-dark font-sans text-[#141216] dark:text-white transition-colors duration-300 min-h-screen flex flex-col items-center">
        <header className="w-full flex justify-center pt-12 pb-8 relative">
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <svg
                className="w-8 h-8"
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
            <h2 className="text-2xl font-bold tracking-tight font-display text-[#141216] dark:text-white">
              AutoShare
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="absolute right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#726a81] hover:text-primary shadow-sm transition-colors"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
        </header>
        <main className="flex w-full flex-1 flex-col items-center px-6 max-w-[420px]">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-3 font-display">
              Sign In
            </h1>
            <p className="text-[#726a81] dark:text-[#a199b0] text-lg">
              Welcome back
            </p>
          </div>
          <div className="w-full space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] rounded-xl py-3 px-4 hover:border-primary transition-all duration-200">
                <img
                  alt="Google"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBRjX5pvwdMg9kDiSgbjJS9hTHvWE8m298Kc3R1JGGPfxigZo0ohT8868lBjQbhp2Y3hU_LrOaONYIRho3-6Ep9ued1jUBgdkKIBOcoFpr4ktu1-lMkP5YTcRRmHhDP4qXGcm-Wp_nR7j8nxV7loF9ts9hFlw3qSJiqzqD6oXzjfWpVpgbsvuxu6Azzn_1BqiGIH6yxcHEkjUjEZZ1flcB4OsfXI5hL8V8DzDsdDXLZhTr3vQvE48eNA-dsZAgS_MApXfOrqw-WVM"
                />
                <span className="text-sm font-semibold">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] rounded-xl py-3 px-4 hover:border-primary transition-all duration-200">
                <span className="material-symbols-outlined text-[22px]">
                  ios
                </span>
                <span className="text-sm font-semibold">Apple</span>
              </button>
            </div>
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[#e0dde3] dark:border-[#332e3d]" />
              <span className="flex-shrink mx-4 text-xs font-semibold text-[#726a81] dark:text-[#a199b0] uppercase tracking-widest">
                or continue with
              </span>
              <div className="flex-grow border-t border-[#e0dde3] dark:border-[#332e3d]" />
            </div>
            <form className="space-y-5" onSubmit={handleLoginSubmit}>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[#141216] dark:text-[#e0dde3] ml-1">
                  Email
                </label>
                <input
                  className="w-full h-12 px-4 rounded-xl border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#141216] dark:text-white placeholder:text-[#a199b0] transition-all outline-none focus:ring-1 focus:ring-primary"
                  placeholder="name@email.com"
                  required
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-[#141216] dark:text-[#e0dde3]">
                    Password
                  </label>
                  <a
                    className="text-sm font-semibold text-primary hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <input
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#141216] dark:text-white placeholder:text-[#a199b0] transition-all outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Enter password"
                    required
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#726a81] hover:text-primary"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      visibility
                    </span>
                  </button>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <button
                  className="w-full h-12 bg-primary hover:bg-opacity-90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  type="submit"
                >
                  Sign In
                </button>
                <button
                  className="w-full h-12 border border-[#e0dde3] dark:border-[#332e3d] text-[#141216] dark:text-[#e0dde3] font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 group"
                  type="button"
                >
                  <span>Continue as Guest</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
            <p className="text-center text-[#726a81] dark:text-[#a199b0]">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                className="text-primary font-bold hover:underline"
                onClick={goToRegister}
              >
                Register
              </button>
            </p>
          </div>
        </main>
        <footer className="mt-auto w-full py-8 px-10 flex flex-col md:flex-row justify-center items-center gap-8 text-[#726a81] dark:text-[#a199b0]">
          <div className="flex gap-8">
            <a
              className="text-xs font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-xs font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-xs font-semibold hover:text-primary transition-colors"
              href="#"
            >
              Help
            </a>
          </div>
          <div className="text-[11px] font-medium opacity-60">
            © 2024 AUTOSHARE
          </div>
        </footer>
      </div>
    )
  }

  if (view === 'register-account-type') {
    return (
      <div className="bg-background-light dark:bg-background-dark font-sans text-[#141216] dark:text-white transition-colors duration-300 min-h-screen flex flex-col items-center">
        <header className="w-full flex justify-center py-10 relative">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <svg
                className="w-8 h-8"
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
            <h2 className="text-2xl font-display font-bold tracking-tight">
              AutoShare
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="absolute right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#726a81] hover:text-primary shadow-sm transition-colors"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
        </header>
        <main className="flex w-full flex-col items-center justify-center px-4 max-w-4xl">
          <div className="w-full mb-12">
            <div className="flex items-center justify-between relative max-w-2xl mx-auto">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#e0dde3] dark:bg-[#332e3d] -translate-y-1/2 z-0" />
              <div className="relative z-10 flex flex-col items-center active-step">
                <div className="step-circle w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white text-sm font-bold border-4 border-background-light dark:border-background-dark">
                  1
                </div>
                <span className="step-label absolute top-12 whitespace-nowrap text-sm font-medium">
                  Account Type
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="step-circle w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#211d29] text-[#726a81] text-sm font-bold border-4 border-background-light dark:border-background-dark">
                  2
                </div>
                <span className="step-label absolute top-12 whitespace-nowrap text-sm font-medium text-[#726a81] dark:text-[#a199b0]">
                  Basic Info
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="step-circle w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#211d29] text-[#726a81] text-sm font-bold border-4 border-background-light dark:border-background-dark">
                  3
                </div>
                <span className="step-label absolute top-12 whitespace-nowrap text-sm font-medium text-[#726a81] dark:text-[#a199b0]">
                  Final Details
                </span>
              </div>
            </div>
          </div>
          <div className="text-center mt-12 mb-12">
            <h1 className="text-4xl font-display font-bold mb-3">
              Create an account
            </h1>
            <p className="text-lg text-[#726a81] dark:text-[#a199b0]">
              It only takes a few steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
            <button
              onClick={() => setRegisterData(prev => ({ ...prev, role: 'ROLE_RENTER' }))}
              className={`group relative flex flex-col items-start p-8 bg-white dark:bg-[#211d29] border-2 ${registerData.role === 'ROLE_RENTER' ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'} focus:border-primary ring-offset-2 transition-all rounded-2xl shadow-sm text-left`}
            >
              <div className={`w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors ${registerData.role === 'ROLE_RENTER' ? 'bg-primary text-white' : ''}`}>
                <span className="material-symbols-outlined text-3xl">
                  person
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Regular User</h3>
              <p className="text-[#726a81] dark:text-[#a199b0] text-sm leading-relaxed">
                I want to rent cars for my personal trips or daily commutes.
              </p>
              <div className={`absolute top-4 right-4 ${registerData.role === 'ROLE_RENTER' ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}>
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
              </div>
            </button>
            <button
              onClick={() => setRegisterData(prev => ({ ...prev, role: 'ROLE_VEHICLE_OWNER' }))}
              className={`group relative flex flex-col items-start p-8 bg-white dark:bg-[#211d29] border-2 ${registerData.role === 'ROLE_VEHICLE_OWNER' ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'} focus:border-primary ring-offset-2 transition-all rounded-2xl shadow-sm text-left`}
            >
              <div className={`w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors ${registerData.role === 'ROLE_VEHICLE_OWNER' ? 'bg-primary text-white' : ''}`}>
                <span className="material-symbols-outlined text-3xl">
                  corporate_fare
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Car Rental Company</h3>
              <p className="text-[#726a81] dark:text-[#a199b0] text-sm leading-relaxed">
                I represent a business and want to list a fleet of vehicles.
              </p>
              <div className={`absolute top-4 right-4 ${registerData.role === 'ROLE_VEHICLE_OWNER' ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}>
                <span className="material-symbols-outlined text-primary">
                  check_circle
                </span>
              </div>
            </button>
          </div>
          <div className="w-full max-w-3xl flex flex-col items-center gap-6 pb-20">
            <button
              className="w-full md:w-64 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              onClick={goToBasicInfo}
              type="button"
            >
              Continue
            </button>
            <p className="text-sm text-[#726a81] dark:text-[#a199b0]">
              Already have an account?{' '}
              <button
                type="button"
                className="text-primary font-bold hover:underline"
                onClick={goToSignIn}
              >
                Sign In
              </button>
            </p>
          </div>
        </main>
        <footer className="mt-auto w-full max-w-[960px] border-t border-[#e0dde3] dark:border-[#332e3d] py-6 px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-8">
            <a
              className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
              href="#"
            >
              Help Center
            </a>
          </div>
          <div className="text-xs text-[#726a81] dark:text-[#a199b0]">
            © 2024 AutoShare Inc. All rights reserved.
          </div>
        </footer>
      </div>
    )
  }

  if (view === 'register-basic-info') {
    return (
      <div className="bg-background-light dark:bg-background-dark font-sans text-[#141216] dark:text-white transition-colors duration-300 min-h-screen flex flex-col items-center">
        <header className="w-full flex justify-center py-8 relative">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <svg
                className="w-8 h-8"
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
            <h2 className="text-2xl font-display font-bold tracking-tight">
              AutoShare
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="absolute right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#726a81] hover:text-primary shadow-sm transition-colors"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>
        </header>
        <main className="flex w-full flex-col items-center px-4 pb-20">
          <div className="w-full max-w-[560px]">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mb-2">
                    <span className="material-symbols-outlined text-sm">
                      check
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    Account
                  </span>
                </div>
                <div className="flex-1 h-[2px] bg-primary mx-4 -mt-6" />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mb-2">
                    2
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    Basic Info
                  </span>
                </div>
                <div className="flex-1 h-[2px] bg-[#e0dde3] dark:bg-[#332e3d] mx-4 -mt-6" />
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#e0dde3] dark:bg-[#332e3d] text-[#726a81] flex items-center justify-center text-sm font-bold mb-2">
                    3
                  </div>
                  <span className="text-xs font-semibold text-[#726a81]">
                    Verify
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#211d29] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e0dde3] dark:border-[#332e3d] p-8 md:p-10">
              <div className="text-left mb-8">
                <h1 className="text-3xl font-display font-bold leading-tight mb-2">
                  Basic Information
                </h1>
                <p className="text-[#726a81] dark:text-[#a199b0]">
                  Tell us a bit about yourself to get started.
                </p>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold pb-2 text-[#141216] dark:text-[#e0dde3]">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      required
                      value={registerData.firstName}
                      onChange={handleRegisterChange}
                      className="w-full rounded-lg text-[#141216] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] h-12 placeholder:text-[#a199b0] px-4 text-base font-normal transition-all"
                      placeholder="Enter your first name"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold pb-2 text-[#141216] dark:text-[#e0dde3]">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      required
                      value={registerData.lastName}
                      onChange={handleRegisterChange}
                      className="w-full rounded-lg text-[#141216] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] h-12 placeholder:text-[#a199b0] px-4 text-base font-normal transition-all"
                      placeholder="Enter your last name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-semibold pb-2 text-[#141216] dark:text-[#e0dde3]">
                    Email Address
                  </label>
                  <input
                    name="email"
                    required
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="w-full rounded-lg text-[#141216] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] h-12 placeholder:text-[#a199b0] px-4 text-base font-normal transition-all"
                    placeholder="name@example.com"
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold pb-2 text-[#141216] dark:text-[#e0dde3]">
                      Password
                    </label>
                    <div className="flex w-full items-stretch rounded-lg group">
                      <input
                        name="password"
                        required
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        className="w-full rounded-lg text-[#141216] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] h-12 placeholder:text-[#a199b0] px-4 rounded-r-none border-r-0 text-base font-normal transition-all"
                        placeholder="Create password"
                        type="password"
                      />
                      <div className="flex border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] items-center justify-center px-4 rounded-r-lg border-l-0 text-[#726a81] cursor-pointer hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold pb-2 text-[#141216] dark:text-[#e0dde3]">
                      Confirm Password
                    </label>
                    <div className="flex w-full items-stretch rounded-lg group">
                      <input
                        name="confirmPassword"
                        required
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        className="w-full rounded-lg text-[#141216] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] h-12 placeholder:text-[#a199b0] px-4 rounded-r-none border-r-0 text-base font-normal transition-all"
                        placeholder="Confirm password"
                        type="password"
                      />
                      <div className="flex border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] items-center justify-center px-4 rounded-r-lg border-l-0 text-[#726a81] cursor-pointer hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <button
                    className="flex-1 border-2 border-[#e0dde3] dark:border-[#332e3d] text-[#141216] dark:text-white font-bold py-3.5 rounded-lg hover:bg-gray-50 dark:hover:bg:white/5 transition-all active:scale-[0.98]"
                    type="button"
                    onClick={goToRegister}
                  >
                    Back
                  </button>
                  <button
                    className="flex-[2] bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                    type="button"
                    onClick={goToFinalDetails}
                  >
                    Next Step
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <footer className="mt-auto w-full max-w-[960px] border-t border-[#e0dde3] dark:border-[#332e3d] py-8 px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-8">
            <a
              className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
              href="#"
            >
              Help Center
            </a>
          </div>
          <div className="text-xs text-[#726a81] dark:text-[#a199b0]">
            © 2024 AutoShare Inc. All rights reserved.
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#141216] dark:text-white transition-colors duration-300 min-h-screen flex flex-col items-center">
      <header className="w-full flex justify-center py-8 relative">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <svg
              className="w-8 h-8"
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
          <h2 className="text-2xl font-bold tracking-tight">AutoShare</h2>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="absolute right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] text-[#726a81] hover:text-primary shadow-sm transition-colors"
          aria-label="Toggle theme"
        >
          <span className="material-symbols-outlined text-[18px]">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
      </header>
      <main className="flex w-full flex-col items-center justify-center px-4 pb-20">
        <div className="w-full max-w-[440px] mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#e0dde3] dark:bg-[#332e3d] -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary -translate-y-1/2 z-0" style={{ width: '100%' }} />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                <span className="material-symbols-outlined text-lg">
                  check
                </span>
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider text-[#726a81] whitespace-nowrap">
                Account
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                <span className="material-symbols-outlined text-lg">
                  check
                </span>
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider text-[#726a81] whitespace-nowrap">
                Verification
              </span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white ring-4 ring-white dark:ring-[#18141e] flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider text-primary whitespace-nowrap">
                Final Details
              </span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[440px] bg-white dark:bg-[#211d29] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e0dde3] dark:border-[#332e3d] overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold leading-tight mb-2">
                Final Details
              </h1>
              <p className="text-sm text-[#726a81] dark:text-[#a199b0]">
                Just a few more things to get you on the road.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleRegisterSubmit}>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center pb-2">
                  <label className="text-sm font-medium text-[#141216] dark:text-[#e0dde3]">
                    Phone Number
                  </label>
                  <span className="text-[11px] font-bold text-[#726a81] uppercase tracking-wider">
                    Optional
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#726a81] material-symbols-outlined text-[20px]">
                    call
                  </span>
                  <input
                    name="phoneNumber"
                    className="w-full rounded-lg text-[#141216] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] h-12 placeholder:text-[#726a81] pl-11 pr-4 text-base font-normal transition-all"
                    placeholder={registerData.country ? LOCATIONS[registerData.country]?.phonePlaceholder : '+1 (555) 000-0000'}
                    type="tel"
                    value={registerData.phoneNumber}
                    onChange={handleRegisterChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium pb-2 text-[#141216] dark:text-[#e0dde3]">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      className="w-full appearance-none rounded-lg text-[#141216] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] h-12 px-4 text-base font-normal transition-all"
                      value={registerData.country}
                      onChange={handleRegisterChange}
                    >
                      <option value="" disabled>
                        Select country
                      </option>
                      {Object.entries(LOCATIONS).map(([code, { label }]) => (
                        <option key={code} value={code}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#726a81] pointer-events-none material-symbols-outlined">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium pb-2 text-[#141216] dark:text-[#e0dde3]">
                    City
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      className="w-full appearance-none rounded-lg text-[#141216] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#e0dde3] dark:border-[#332e3d] bg-white dark:bg-[#18141e] h-12 px-4 text-base font-normal transition-all"
                      value={registerData.city}
                      onChange={handleRegisterChange}
                      disabled={!registerData.country}
                    >
                      <option value="" disabled>
                        {registerData.country ? 'Select city' : 'Select country first'}
                      </option>
                      {registerData.country && LOCATIONS[registerData.country]?.cities.map(city => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#726a81] pointer-events-none material-symbols-outlined">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center h-5">
                    <input
                      className="w-5 h-5 rounded border-[#e0dde3] dark:border-[#332e3d] text-primary focus:ring-primary/20 cursor-pointer"
                      required
                      type="checkbox"
                      name="agreeToTerms"
                      checked={registerData.agreeToTerms}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <span className="text-sm text-[#726a81] dark:text-[#a199b0] leading-tight">
                    I agree to the{' '}
                    <a
                      className="text-primary font-semibold hover:underline"
                      href="#"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      className="text-primary font-semibold hover:underline"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all mt-4 active:scale-[0.98] flex items-center justify-center gap-2"
                type="submit"
              >
                Create Account
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </form>
            <p className="text-center mt-8 text-xs text-[#726a81] dark:text-[#a199b0]">
              Need help?{' '}
              <a
                className="text-primary font-bold hover:underline"
                href="#"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </main>
      <footer className="mt-auto w-full max-w-[960px] border-t border-[#e0dde3] dark:border-[#332e3d] py-6 px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-8">
          <a
            className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs font-medium text-[#726a81] dark:text-[#a199b0] hover:text-primary transition-colors"
            href="#"
          >
            Help Center
          </a>
        </div>
        <div className="text-xs text-[#726a81] dark:text-[#a199b0]">
          © 2026 iRent Inc. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default AuthPage

