import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const OwnerBookings = () => {
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
                                <a className="text-booking-primary text-sm font-bold border-b-2 border-booking-primary pb-1" href="#">Bookings</a>
                                <Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-booking-primary transition-colors" to="/owner/cars">Vehicles</Link>
                                <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-booking-primary transition-colors" href="#">Earnings</a>
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
                                        <span className="px-2 py-0.5 rounded-full bg-booking-primary/10 text-booking-primary text-xs font-bold uppercase tracking-wider">12 Total</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-base">You have 4 new rental inquiries that need your attention.</p>
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
                                    <a className="flex flex-col items-center justify-center border-b-2 border-booking-primary text-booking-primary pb-3 pt-2 group" href="#">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold leading-normal tracking-tight">All Requests</p>
                                            <span className="bg-booking-primary/10 px-1.5 rounded text-[10px]">12</span>
                                        </div>
                                    </a>
                                    <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 pb-3 pt-2" href="#">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold leading-normal tracking-tight">Pending</p>
                                            <span className="bg-slate-100 px-1.5 rounded text-[10px]">4</span>
                                        </div>
                                    </a>
                                    <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 pb-3 pt-2" href="#">
                                        <p className="text-sm font-bold leading-normal tracking-tight">Accepted</p>
                                    </a>
                                    <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-700 pb-3 pt-2" href="#">
                                        <p className="text-sm font-bold leading-normal tracking-tight">Rejected</p>
                                    </a>
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
                                        {/* Row 1 (Pending) */}
                                        <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/20 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-booking-primary/10 flex items-center justify-center text-booking-primary font-bold overflow-hidden">
                                                        <img className="h-full w-full object-cover" data-alt="Renter Alex Johnson profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXIv_yaavNdaAFxiPgV7RyL1uIHRPc65mXrJLJZcbZ6_xQ8IjfX3uf4rouD2OP5o6ACma3okWeoZJ7dPO4Lw-rEuMgF_iJnJSSDu1psaJSGUsFr_tHsP5CnNcaNHix8BRn7Uw-yksJ3-uQ8cEBs4reLcjvkY6rSEh1tz04RXUjxLKp35cl6aRI1OUJmaxIfKilpN0MzD7-vtuNyAQbTUqxWQTf2Ky5YmFOBVXcHB_txre8ii1F2PTo5Of6O0JUdyO7bQ3B53n82zw" />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-900 dark:text-white text-sm font-semibold">Alex Johnson</p>
                                                        <div className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[12px] text-amber-400 fill-amber-400">star</span>
                                                            <span className="text-[11px] text-slate-400">4.9 (24 trips)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="text-slate-900 dark:text-white text-sm font-medium">Tesla Model 3</p>
                                                    <p className="text-slate-400 text-[12px]">Electric • Silver Metallic</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[16px] text-slate-400">event</span>
                                                    <div className="text-sm">
                                                        <p className="text-slate-700 dark:text-slate-300">Oct 12 – Oct 15</p>
                                                        <p className="text-slate-400 text-[11px]">3 days rental</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <p className="text-slate-900 dark:text-white text-base font-bold">$450.00</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold bg-status-orange/10 text-status-orange border border-status-orange/20">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-status-orange animate-pulse"></span>
                                                        Pending
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="bg-status-green hover:bg-status-green/90 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm">Accept</button>
                                                    <button className="bg-slate-100 dark:bg-slate-800 hover:bg-status-red hover:text-white text-slate-600 dark:text-slate-300 text-[12px] font-bold px-3 py-1.5 rounded-lg transition-all">Reject</button>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Row 2 (Accepted) */}
                                        <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-booking-primary/10 flex items-center justify-center text-booking-primary font-bold overflow-hidden">
                                                        <img className="h-full w-full object-cover" data-alt="Renter Sarah Williams profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA288nMFmA_cFFxrudIhS2UgczEbpfGzWudJwZbktW-5xcSp6xd-zlL_YI1SjzMid3DfIfeOdY7VUWB4AV9JEGfFGyPsP1WNnLMxNLFSw2aPoz3g06dI8kpZTeKtHrCWqnSmMdZTxzNl6cADPa-u59poeqgZKC8Psx0IgYnDpG4Sa8ib0nwjlBP2u8z2BE8zuvZj3-V2G9VhCxw1X2H1Cv24MDdNddbh0L43agUTaDkyPZngqxsvjZyAwEiAggQRnExhi_8eBNeyMk" />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-900 dark:text-white text-sm font-semibold">Sarah Williams</p>
                                                        <div className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[12px] text-amber-400 fill-amber-400">star</span>
                                                            <span className="text-[11px] text-slate-400">5.0 (8 trips)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="text-slate-900 dark:text-white text-sm font-medium">BMW X5</p>
                                                    <p className="text-slate-400 text-[12px]">SUV • Alpine White</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[16px] text-slate-400">event</span>
                                                    <div className="text-sm">
                                                        <p className="text-slate-700 dark:text-slate-300">Oct 20 – Oct 22</p>
                                                        <p className="text-slate-400 text-[11px]">2 days rental</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <p className="text-slate-900 dark:text-white text-base font-bold">$320.00</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold bg-status-green/10 text-status-green border border-status-green/20">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-status-green"></span>
                                                        Accepted
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-booking-primary hover:text-booking-primary/80 text-sm font-bold tracking-tight">View Details</button>
                                            </td>
                                        </tr>
                                        {/* Row 3 (Rejected) */}
                                        <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-booking-primary/10 flex items-center justify-center text-booking-primary font-bold overflow-hidden">
                                                        <img className="h-full w-full object-cover" data-alt="Renter Michael Chen profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuByuRR637XWp19F3z4aOuPEQ3c0dfXaD5zJMgIo2ophKVxQ0tNDjr2uBGHPcXyDeZivXYDDCkQCRUbzD9ha9tB3vQgfRWuohfOidIgX0NUzCpL9d7JXZVwzjJDEobzuSZ2z2SnBoQl2tBKQu0d8dPPoYElE893AMcSBAOBzkuTPqoRcxqK10cUlA4m2TbJmoTTbQwTkILz2T2_xdf3j3aoUAayOV4GIoDduPyqZlw8GpgXiBwONrisUak3jmGLdq3CMd693VcohoYw" />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-900 dark:text-white text-sm font-semibold">Michael Chen</p>
                                                        <div className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[12px] text-amber-400 fill-amber-400">star</span>
                                                            <span className="text-[11px] text-slate-400">4.7 (15 trips)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="text-slate-900 dark:text-white text-sm font-medium">Audi A4</p>
                                                    <p className="text-slate-400 text-[12px]">Sedan • Midnight Blue</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[16px] text-slate-400">event</span>
                                                    <div className="text-sm">
                                                        <p className="text-slate-700 dark:text-slate-300">Oct 18 – Oct 19</p>
                                                        <p className="text-slate-400 text-[11px]">1 day rental</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <p className="text-slate-900 dark:text-white text-base font-bold">$150.00</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold bg-status-red/10 text-status-red border border-status-red/20">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-status-red"></span>
                                                        Rejected
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-slate-400 hover:text-slate-600 text-sm font-bold tracking-tight">Archived</button>
                                            </td>
                                        </tr>
                                        {/* Row 4 (Pending) */}
                                        <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/20 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-booking-primary/10 flex items-center justify-center text-booking-primary font-bold overflow-hidden">
                                                        <img className="h-full w-full object-cover" data-alt="Renter Emily Davis profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQA2Fs_cgl6oJsyCJvIGlzc3faijXXONkTIS2nBxbeOVUfsKjnUYdnVAwtw6Mcsre0ZiSub6E_pa2VcoBAErtmuslqUhj6gQjYNL2_ctDNCjK_bEzq7rVQATe7-F8509ncK5m8wBCumTyOOmxZ994IqCzVpYQTAZ4h2POXbIyFOMU2dyjb4tPLVXFtZLv2hnbWDO_m5-ZKHzUThU3GaWdi0Wz9v5Yv4vI3rcAYIrQor8YLPP2pd6Zzs406pL6q2S7TbCgVVTbGa6g" />
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-900 dark:text-white text-sm font-semibold">Emily Davis</p>
                                                        <div className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[12px] text-slate-300">star</span>
                                                            <span className="text-[11px] text-slate-400">New Renter</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="text-slate-900 dark:text-white text-sm font-medium">Tesla Model 3</p>
                                                    <p className="text-slate-400 text-[12px]">Electric • Silver Metallic</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[16px] text-slate-400">event</span>
                                                    <div className="text-sm">
                                                        <p className="text-slate-700 dark:text-slate-300">Oct 25 – Oct 30</p>
                                                        <p className="text-slate-400 text-[11px]">5 days rental</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <p className="text-slate-900 dark:text-white text-base font-bold">$750.00</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-center">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold bg-status-orange/10 text-status-orange border border-status-orange/20">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-status-orange animate-pulse"></span>
                                                        Pending
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="bg-status-green hover:bg-status-green/90 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm">Accept</button>
                                                    <button className="bg-slate-100 dark:bg-slate-800 hover:bg-status-red hover:text-white text-slate-600 dark:text-slate-300 text-[12px] font-bold px-3 py-1.5 rounded-lg transition-all">Reject</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-8">
                                <p className="text-slate-500 text-sm">Showing 1 to 4 of 12 requests</p>
                                <div className="flex items-center gap-1">
                                    <a className="flex size-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100" href="#">
                                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                    </a>
                                    <a className="text-sm font-bold flex size-9 items-center justify-center text-white rounded-lg bg-booking-primary" href="#">1</a>
                                    <a className="text-sm font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg" href="#">2</a>
                                    <a className="text-sm font-medium flex size-9 items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg" href="#">3</a>
                                    <a className="flex size-9 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100" href="#">
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* Footer for additional context */}
                    <footer className="mt-auto px-6 py-10 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-booking-bg-dark/20 text-center">
                        <p className="text-slate-400 text-sm font-medium">Need help with your bookings? <a className="text-booking-primary underline" href="#">Visit Help Center</a></p>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default OwnerBookings
