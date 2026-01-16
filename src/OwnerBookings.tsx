import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCars } from './context/CarContext'
import type { Booking } from './context/CarContext'


const OwnerBookings = () => {
    const { bookings, updateBookingStatus } = useCars()
    const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Confirmed' | 'Rejected'>('All')

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

    const filteredBookings = bookings.filter(b => activeTab === 'All' || b.status === activeTab)

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'Pending').length,
        accepted: bookings.filter(b => b.status === 'Confirmed').length,
        rejected: bookings.filter(b => b.status === 'Rejected').length
    }

    const getStatusStyles = (status: Booking['status']) => {
        switch (status) {
            case 'Pending': return 'bg-status-orange/10 text-status-orange border-status-orange/20';
            case 'Confirmed': return 'bg-status-green/10 text-status-green border-status-green/20';
            case 'Rejected': return 'bg-status-red/10 text-status-red border-status-red/20';
            default: return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    }

    return (
        <div className="bg-white dark:bg-booking-bg-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {/* TopNavBar */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-100 dark:border-slate-800 px-6 py-3 bg-white dark:bg-booking-bg-dark sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <Link to="/owner-dashboard" className="flex items-center gap-3 text-booking-primary hover:opacity-80 transition-opacity">
                                <div className="size-8 flex items-center justify-center bg-booking-primary rounded-lg text-white">
                                    <span className="material-symbols-outlined">directions_car</span>
                                </div>
                                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Owner Dashboard</h2>
                            </Link>
                            <label className="flex flex-col min-w-40 !h-10 max-w-64 hidden md:flex">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div className="text-slate-400 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg" data-icon="search">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-slate-100 dark:bg-slate-800 focus:border-none h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search bookings..." defaultValue="" />
                                </div>
                            </label>
                        </div>
                        <div className="flex flex-1 justify-end gap-6 items-center">
                            <nav className="hidden lg:flex items-center gap-6">
                                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-booking-primary transition-colors" to="/owner-dashboard">Overview</Link>
                                <span className="text-booking-primary text-sm font-bold border-b-2 border-booking-primary pb-1 cursor-pointer">Bookings</span>
                                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-booking-primary transition-colors" to="/owner/cars">Vehicles</Link>
                                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-booking-primary transition-colors" to="/owner/bookings">Earnings</Link>

                            </nav>
                            <div className="flex items-center gap-4">
                                <button className="text-slate-400 hover:text-booking-primary relative">
                                    <span className="material-symbols-outlined">notifications</span>
                                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-status-red ring-2 ring-white"></span>
                                </button>
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-slate-100" data-alt="Owner profile picture" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmGu6k3SyiLwepH8TUSo5MWGrSMdTvcEvzURtOjQsUNfgP2I6fFNmHPPgqJsjuezvlP507PmLbq9pD-sEdL_PQufJGXo9_CmvDNA2WrpCafQ5u9o4qYnxCyKTtkkmi_-c4AMWJEtx8xAA2YyPDinG8hWSDB_gyK1M2vbTzEU1whqNJoiaAjQYIBubV6HjO6BIBIfu93vtZNJDvfZJmLsSjE3gBK6QEWcIw4bg3Go-CHcS3KWcNpZe0qukox9Dea0chPmP4AuXW6Hg")' }}></div>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 flex flex-col items-center">
                        <div className="layout-content-container flex flex-col w-full max-w-[1200px] px-6 py-8">
                            {/* PageHeading */}
                            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">Booking Requests</h1>
                                        <span className="px-2 py-0.5 rounded-full bg-booking-primary/10 text-booking-primary text-xs font-bold uppercase tracking-wider">{stats.total} Total</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-base">You have {stats.pending} new rental inquiries that need your attention.</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                        <span>Export CSV</span>
                                    </button>
                                    <button className="flex items-center gap-2 rounded-lg h-10 px-4 bg-booking-primary text-white text-sm font-bold hover:bg-booking-primary/90 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                        <span>Calendar View</span>
                                    </button>
                                </div>
                            </div>
                            {/* Tabs */}
                            <div className="mb-6">
                                <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
                                    {[
                                        { label: 'All Requests', count: stats.total, value: 'All' },
                                        { label: 'Pending', count: stats.pending, value: 'Pending' },
                                        { label: 'Accepted', count: stats.accepted, value: 'Confirmed' },
                                        { label: 'Rejected', count: stats.rejected, value: 'Rejected' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.value}
                                            onClick={() => setActiveTab(tab.value as any)}
                                            className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 transition-all ${activeTab === tab.value ? 'border-booking-primary text-booking-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold leading-normal tracking-tight">{tab.label}</p>
                                                <span className={`${activeTab === tab.value ? 'bg-booking-primary/10' : 'bg-slate-100 dark:bg-slate-800'} px-1.5 rounded text-[10px]`}>{tab.count}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Enhanced Table */}
                            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-booking-bg-dark/50 shadow-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                                            <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Renter</th>
                                            <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Vehicle</th>
                                            <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Rental Dates</th>
                                            <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">Revenue</th>
                                            <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-center">Status</th>
                                            <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {filteredBookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/20 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-booking-primary/10 flex items-center justify-center text-booking-primary font-bold overflow-hidden">
                                                            <img className="h-full w-full object-cover" alt={booking.renterName} src={`https://ui-avatars.com/api/?name=${booking.renterName}&background=random`} />
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-900 dark:text-white text-sm font-semibold">{booking.renterName}</p>
                                                            <div className="flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-[12px] text-amber-400 fill-amber-400">star</span>
                                                                <span className="text-[11px] text-slate-400">4.9 (Verified)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div>
                                                        <p className="text-slate-900 dark:text-white text-sm font-medium">{booking.carName}</p>
                                                        <p className="text-slate-400 text-[12px]">Vehicle ID: {booking.carId}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-[16px] text-slate-400">event</span>
                                                        <div className="text-sm">
                                                            <p className="text-slate-700 dark:text-slate-300">{booking.startDate} – {booking.endDate}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <p className="text-slate-900 dark:text-white text-base font-bold">{booking.totalPrice} MAD</p>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex justify-center">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold border ${getStatusStyles(booking.status)}`}>
                                                            {booking.status === 'Pending' && <span className="h-1.5 w-1.5 rounded-full bg-status-orange animate-pulse"></span>}
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {booking.status === 'Pending' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                                                    className="bg-status-green hover:bg-status-green/90 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
                                                                >
                                                                    Accept
                                                                </button>
                                                                <button
                                                                    onClick={() => updateBookingStatus(booking.id, 'Rejected')}
                                                                    className="bg-slate-100 dark:bg-slate-800 hover:bg-status-red hover:text-white text-slate-600 dark:text-slate-300 text-[12px] font-bold px-3 py-1.5 rounded-lg transition-all"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button className="text-booking-primary hover:text-booking-primary/80 text-sm font-bold tracking-tight">View Details</button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredBookings.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                                                    No {activeTab.toLowerCase()} bookings found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                    {/* Footer for additional context */}
                    <footer className="mt-auto px-6 py-10 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-booking-bg-dark/20 text-center">
                        <p className="text-slate-400 text-sm font-medium">Need help with your bookings? <Link className="text-booking-primary underline" to="/owner/agency-profile">Visit Help Center</Link></p>

                    </footer>
                </div>
            </div>
        </div>
    )
}

export default OwnerBookings
