import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useCars } from './context/CarContext'

const MyCars = () => {
    const { cars, deleteCar } = useCars()

    // Check local storage to ensure dark mode works if set
    useEffect(() => {
        const stored = window.localStorage.getItem('theme') as 'light' | 'dark' | null
        if (stored) {
            const root = document.documentElement
            if (stored === 'dark') {
                root.classList.add('dark')
                root.classList.remove('light')
            } else {
                root.classList.add('light')
                root.classList.remove('dark')
            }
        }
    }, [])

    const stats = {
        total: cars.length,
        active: cars.filter(c => c.available).length,
        available: cars.filter(c => c.available).length, // For now available = active
        booked: cars.filter(c => !c.available).length
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-space text-[#141216] dark:text-white antialiased min-h-screen">
            <div className="flex min-h-screen">
                {/* Sidebar Navigation */}
                <aside className="w-64 bg-white dark:bg-[#1a1c23] border-r border-gray-200 dark:border-gray-800 flex flex-col fixed h-full z-50">
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">directions_car</span>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight">FleetHub</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Rental Manager</p>
                        </div>
                    </div>
                    <nav className="mt-4 flex-1">
                        <div className="px-4 space-y-1">
                            <Link className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" to="/owner-dashboard">
                                <span className="material-symbols-outlined">dashboard</span>
                                <span className="text-sm font-semibold">Overview</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 border-r-4 border-primary text-primary rounded-r-none rounded-l-lg transition-colors" to="/owner/cars">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>garage</span>
                                <span className="text-sm font-semibold">My Cars</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" to="/owner/bookings">
                                <span className="material-symbols-outlined">calendar_month</span>
                                <span className="text-sm font-semibold">Bookings</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" to="/owner/bookings">
                                <span className="material-symbols-outlined">payments</span>
                                <span className="text-sm font-semibold">Revenue</span>
                            </Link>

                            <Link className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors" to="/owner/agency-profile">
                                <span className="material-symbols-outlined">settings</span>
                                <span className="text-sm font-semibold">Settings</span>
                            </Link>
                        </div>
                    </nav>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                        <button className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary py-2.5 rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all">
                            <span className="material-symbols-outlined text-sm">support_agent</span>
                            Support Center
                        </button>
                    </div>
                </aside>
                {/* Main Content */}
                <main className="flex-1 ml-64 min-h-screen">
                    {/* Top Header */}
                    <header className="sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-40 px-8 py-6 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex justify-between items-center max-w-7xl mx-auto">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">My Cars</h1>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your vehicle inventory and availability</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">search</span>
                                    <input className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-primary focus:border-primary w-64" placeholder="Search cars..." type="text" />
                                </div>
                                <Link
                                    className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                    to="/owner/cars/new"
                                >
                                    <span className="material-symbols-outlined text-lg">add_circle</span>
                                    Add New Car
                                </Link>
                            </div>
                        </div>
                    </header>
                    <div className="px-8 py-8 max-w-7xl mx-auto">
                        {/* Fleet Stats Mini-Bar */}
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Fleet</p>
                                <p className="text-2xl font-bold mt-1">{stats.total}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Listings</p>
                                <p className="text-2xl font-bold mt-1">{stats.active}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Available Now</p>
                                <p className="text-2xl font-bold mt-1 text-status-available">{stats.available}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Currently Booked</p>
                                <p className="text-2xl font-bold mt-1 text-primary">{stats.booked}</p>
                            </div>
                        </div>
                        {/* Car Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {cars.map((car) => (
                                <div key={car.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 group hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${car.image}')` }}></div>
                                        <div className="absolute top-3 left-3">
                                            <span className={`${car.available ? 'bg-status-available' : 'bg-gray-500'} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg`}>
                                                {car.available ? 'Available' : 'Booked'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg leading-tight truncate mr-2" title={car.name}>{car.name}</h3>
                                            <p className="text-primary font-bold text-base flex-shrink-0">{car.price} MAD<span className="text-gray-400 text-[10px] font-medium">/day</span></p>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">location_on</span> Casablanca, MA
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                                            <Link
                                                className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-primary font-bold text-sm transition-colors"
                                                to={`/owner/cars/new`} // For now link back to new/basic as edit is same form
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span> Edit
                                            </Link>

                                            <button
                                                onClick={() => deleteCar(car.id)}
                                                className="flex items-center gap-1.5 text-red-500 hover:text-red-700 font-bold text-sm transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Add New Placeholder */}
                            <Link
                                className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center p-8 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer group h-full min-h-[340px]"
                                to="/owner/cars/new"
                            >
                                <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-primary text-3xl font-bold">add</span>
                                </div>
                                <h4 className="font-bold text-lg">Add New Car</h4>
                                <p className="text-gray-500 text-sm text-center mt-2 max-w-[200px]">Expand your fleet and start earning today.</p>
                            </Link>
                        </div>
                        {/* Footer / Action Panel */}
                        <div className="mt-12 p-6 bg-white dark:bg-[#1a1c23] border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-2xl">visibility</span>
                                </div>
                                <div>
                                    <p className="text-base font-bold">Fleet Visibility Status</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Your fleet is currently visible to renters in the marketplace.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-400 uppercase mr-2">Marketplace Online</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input defaultChecked className="sr-only peer" type="checkbox" />
                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default MyCars
