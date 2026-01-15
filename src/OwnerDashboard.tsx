import { useEffect } from 'react'

const OwnerDashboard = () => {
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
        <div className="bg-background-light dark:bg-background-dark text-[#141216] dark:text-white antialiased min-h-screen font-display">
            <div className="flex min-h-screen">
                {/* Sidebar Navigation */}
                <aside className="w-64 border-r border-[#e0dde3] dark:border-[#2a2631] bg-white dark:bg-[#1f1b26] hidden lg:flex flex-col sticky top-0 h-screen">
                    <div className="p-6 flex flex-col h-full">
                        {/* Branding */}
                        <div className="flex items-center gap-3 mb-10">
                            <div className="bg-primary size-9 rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">directions_car</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-[#141216] dark:text-white text-base font-bold leading-none tracking-tight">
                                    DriveShare
                                </h1>
                                <p className="text-[#726a81] text-xs font-medium mt-1 uppercase tracking-wider">
                                    Owner Portal
                                </p>
                            </div>
                        </div>
                        {/* Nav Links */}
                        <nav className="flex flex-col gap-1.5 flex-1">
                            <a
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold transition-colors"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-[22px]">
                                    grid_view
                                </span>
                                <span className="text-sm">Overview</span>
                            </a>
                            <a
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#726a81] hover:bg-[#f2f1f4] dark:hover:bg-[#2a2631] hover:text-[#141216] dark:hover:text-white transition-colors group"
                                href="/owner/cars"
                            >
                                <span className="material-symbols-outlined text-[22px]">garage</span>
                                <span className="text-sm font-medium">My Cars</span>
                            </a>
                            <a
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#726a81] hover:bg-[#f2f1f4] dark:hover:bg-[#2a2631] hover:text-[#141216] dark:hover:text-white transition-colors group"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-[22px]">
                                    add_circle
                                </span>
                                <span className="text-sm font-medium">Add New Car</span>
                            </a>
                            <a
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#726a81] hover:bg-[#f2f1f4] dark:hover:bg-[#2a2631] hover:text-[#141216] dark:hover:text-white transition-colors group"
                                href="/owner/bookings"
                            >
                                <span className="material-symbols-outlined text-[22px]">
                                    calendar_today
                                </span>
                                <span className="text-sm font-medium">Bookings</span>
                            </a>
                            <a
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#726a81] hover:bg-[#f2f1f4] dark:hover:bg-[#2a2631] hover:text-[#141216] dark:hover:text-white transition-colors group"
                                href="/owner/agency-profile"
                            >
                                <span className="material-symbols-outlined text-[22px]">
                                    account_circle
                                </span>
                                <span className="text-sm font-medium">Profile</span>
                            </a>
                        </nav>
                        {/* Footer Nav */}
                        <div className="pt-6 border-t border-[#e0dde3] dark:border-[#2a2631] flex flex-col gap-1.5">
                            <a
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#726a81] hover:bg-[#f2f1f4] dark:hover:bg-[#2a2631] hover:text-[#141216] dark:hover:text-white transition-colors group"
                                href="/owner/agency-profile"
                            >
                                <span className="material-symbols-outlined text-[22px]">
                                    settings
                                </span>
                                <span className="text-sm font-medium">Settings</span>
                            </a>
                            <a
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors group"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-[22px]">
                                    logout
                                </span>
                                <span className="text-sm font-medium">Logout</span>
                            </a>
                        </div>
                    </div>
                </aside>
                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    {/* Top Header (Desktop Only) */}
                    <header className="h-16 border-b border-[#e0dde3] dark:border-[#2a2631] bg-white dark:bg-[#1f1b26] flex items-center justify-between px-8 sticky top-0 z-10">
                        <h2 className="text-lg font-bold">Dashboard Overview</h2>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-[#726a81] hover:bg-[#f2f1f4] dark:hover:bg-[#2a2631] rounded-full">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <div
                                className="size-8 rounded-full bg-center bg-cover border border-[#e0dde3] dark:border-[#2a2631]"
                                data-alt="User profile avatar"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-1Z2zQy-C5ARg9CBQreSr0PNCa1ZFEoz2Y22ts-UMO-79HD4vRtg5r3yRR0uvggmTo7vieg67o_MocMWM8ldIjtR7aIhCrAoYzlABLWbMENoJ4nI7EzsWHYKT04fIUqSk30X3lq30kQzTyJCeB5iMNvSrkq1LoAz4qQgDHtGMrMKZUwrEdQgko2q6fZ_kQWhPwYYdM9FT2z9sbpxjPjw6bJRuRL1tAKuetaH4htNYQpDsOT5i8P_QxaGmlDSBMx0Lw6pkP2o89vE')",
                                }}
                            ></div>
                        </div>
                    </header>
                    <div className="p-8 max-w-7xl mx-auto space-y-8">
                        {/* Stats Grid */}
                        <section>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#e0dde3] dark:border-[#2a2631] bg-white dark:bg-[#1f1b26] hover:border-primary/30 transition-colors shadow-sm">
                                    <p className="text-[#726a81] text-xs font-bold uppercase tracking-wider leading-normal">
                                        Total cars listed
                                    </p>
                                    <p className="text-[#141216] dark:text-white tracking-tight text-3xl font-extrabold leading-tight">
                                        12
                                    </p>
                                    <div className="mt-2 flex items-center text-xs text-green-600 font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded w-fit">
                                        <span className="material-symbols-outlined text-[14px] mr-1">
                                            trending_up
                                        </span>{' '}
                                        +2 this month
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#e0dde3] dark:border-[#2a2631] bg-white dark:bg-[#1f1b26] hover:border-primary/30 transition-colors shadow-sm">
                                    <p className="text-[#726a81] text-xs font-bold uppercase tracking-wider leading-normal">
                                        Active bookings
                                    </p>
                                    <p className="text-[#141216] dark:text-white tracking-tight text-3xl font-extrabold leading-tight">
                                        5
                                    </p>
                                    <div className="mt-2 flex items-center text-xs text-[#726a81] font-semibold bg-[#f2f1f4] dark:bg-[#2a2631] px-2 py-0.5 rounded w-fit">
                                        4 cars in use
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#e0dde3] dark:border-[#2a2631] bg-white dark:bg-[#1f1b26] hover:border-primary/30 transition-colors shadow-sm">
                                    <p className="text-[#726a81] text-xs font-bold uppercase tracking-wider leading-normal">
                                        Pending requests
                                    </p>
                                    <p className="text-[#141216] dark:text-white tracking-tight text-3xl font-extrabold leading-tight">
                                        3
                                    </p>
                                    <div className="mt-2 flex items-center text-xs text-amber-600 font-semibold bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded w-fit">
                                        Needs attention
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#e0dde3] dark:border-[#2a2631] bg-white dark:bg-[#1f1b26] hover:border-primary/30 transition-colors shadow-sm">
                                    <p className="text-[#726a81] text-xs font-bold uppercase tracking-wider leading-normal">
                                        Total Earnings
                                    </p>
                                    <p className="text-[#141216] dark:text-white tracking-tight text-3xl font-extrabold leading-tight">
                                        $4,250.00
                                    </p>
                                    <div className="mt-2 flex items-center text-xs text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded w-fit">
                                        <span className="material-symbols-outlined text-[14px] mr-1">
                                            payments
                                        </span>{' '}
                                        Paid out monthly
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Recent Activity Section */}
                        <section className="bg-white dark:bg-[#1f1b26] rounded-xl border border-[#e0dde3] dark:border-[#2a2631] overflow-hidden shadow-sm">
                            <div className="px-6 py-5 border-b border-[#e0dde3] dark:border-[#2a2631] flex items-center justify-between">
                                <h2 className="text-[#141216] dark:text-white text-lg font-bold leading-tight">
                                    Recent Activity
                                </h2>
                                <button className="text-sm text-primary font-semibold hover:underline">
                                    View all
                                </button>
                            </div>
                            <div className="divide-y divide-[#e0dde3] dark:divide-[#2a2631]">
                                {/* Activity Item 1 */}
                                <div className="flex items-center gap-4 px-6 min-h-[80px] py-4 justify-between hover:bg-[#f2f1f4]/50 dark:hover:bg-[#2a2631]/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="text-green-600 flex items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/20 shrink-0 size-11">
                                            <span className="material-symbols-outlined">
                                                check_circle
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-[#141216] dark:text-white text-[15px] font-semibold leading-normal line-clamp-1">
                                                Booking confirmed for Tesla Model 3
                                            </p>
                                            <p className="text-[#726a81] text-sm font-normal leading-normal mt-0.5">
                                                Confirmed by John Doe • 2 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <span className="text-[#726a81] text-xs font-medium tabular-nums">
                                            14:30
                                        </span>
                                    </div>
                                </div>
                                {/* Activity Item 2 */}
                                <div className="flex items-center gap-4 px-6 min-h-[80px] py-4 justify-between hover:bg-[#f2f1f4]/50 dark:hover:bg-[#2a2631]/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-11">
                                            <span className="material-symbols-outlined">pending</span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-[#141216] dark:text-white text-[15px] font-semibold leading-normal line-clamp-1">
                                                New request received for BMW X5
                                            </p>
                                            <p className="text-[#726a81] text-sm font-normal leading-normal mt-0.5">
                                                Requested by Sarah Smith • 5 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <span className="text-[#726a81] text-xs font-medium tabular-nums">
                                            11:15
                                        </span>
                                    </div>
                                </div>
                                {/* Activity Item 3 */}
                                <div className="flex items-center gap-4 px-6 min-h-[80px] py-4 justify-between hover:bg-[#f2f1f4]/50 dark:hover:bg-[#2a2631]/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="text-blue-500 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 shrink-0 size-11">
                                            <span className="material-symbols-outlined">
                                                payments
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-[#141216] dark:text-white text-[15px] font-semibold leading-normal line-clamp-1">
                                                Payment processed for booking #DS-9821
                                            </p>
                                            <p className="text-[#726a81] text-sm font-normal leading-normal mt-0.5">
                                                Earnings added to your wallet • Yesterday
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <span className="text-[#726a81] text-xs font-medium tabular-nums">
                                            18:45
                                        </span>
                                    </div>
                                </div>
                                {/* Activity Item 4 */}
                                <div className="flex items-center gap-4 px-6 min-h-[80px] py-4 justify-between hover:bg-[#f2f1f4]/50 dark:hover:bg-[#2a2631]/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="text-amber-500 flex items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/20 shrink-0 size-11">
                                            <span className="material-symbols-outlined">
                                                report_problem
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-[#141216] dark:text-white text-[15px] font-semibold leading-normal line-clamp-1">
                                                Vehicle inspection reminder
                                            </p>
                                            <p className="text-[#726a81] text-sm font-normal leading-normal mt-0.5">
                                                Audi A4 is due for annual maintenance • 2 days ago
                                            </p>
                                        </div>
                                    </div>
                                    <div className="shrink-0">
                                        <span className="text-[#726a81] text-xs font-medium tabular-nums">
                                            09:00
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* Quick Actions Grid (Bonus context-specific element) */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                            <div className="p-6 rounded-xl bg-primary text-white flex flex-col justify-between min-h-[160px]">
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Grow your fleet</h3>
                                    <p className="text-primary-foreground/80 text-sm max-w-[280px]">
                                        Add another vehicle to your collection and start earning more
                                        from today.
                                    </p>
                                </div>
                                <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-bold w-fit mt-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">
                                        add
                                    </span>{' '}
                                    List New Vehicle
                                </button>
                            </div>
                            <div className="p-6 rounded-xl bg-[#141216] text-white flex flex-col justify-between min-h-[160px]">
                                <div>
                                    <h3 className="text-lg font-bold mb-2">
                                        Account Verification
                                    </h3>
                                    <p className="text-[#726a81] text-sm max-w-[280px]">
                                        Complete your agency verification to list premium vehicle
                                        classes.
                                    </p>
                                </div>
                                <button className="bg-[#2a2631] text-white border border-[#3a3641] px-4 py-2 rounded-lg text-sm font-bold w-fit mt-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">
                                        verified
                                    </span>{' '}
                                    Verify Agency
                                </button>
                            </div>
                        </section>
                    </div>
                </main>
            </div >
        </div >
    )
}

export default OwnerDashboard
