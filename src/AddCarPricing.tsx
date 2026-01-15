import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AddCarPricing = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const previousData = location.state || {}

    // State for form fields
    const [pricePerDay, setPricePerDay] = useState('')
    const [minDuration, setMinDuration] = useState('3 Days')
    const [pickupLocation, setPickupLocation] = useState('Casablanca, Maarif')
    const [showLocationDropdown, setShowLocationDropdown] = useState(false)

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

    const handleBack = () => {
        navigate('/owner/cars/new/media', { state: previousData }) // Pass back all accumulated data
    }

    const handlePublish = () => {
        const finalCarData = {
            ...previousData,
            pricePerDay: parseFloat(pricePerDay) || 0,
            minDuration,
            pickupLocation,
            // Mocking availability for now as full calendar logic is complex
            availability: 'all_available'
        }

        console.log('FINAL CAR SUBMISSION PAYLOAD:', finalCarData)
        alert('Car Published! Check console for payload.\n\nRedirecting to Dashboard...')
        navigate('/owner/cars')
    }

    // Calendar Grid Generator (Simplified for UI demo)
    const renderCalendarDays = () => {
        const days = []
        // Previous month padding
        days.push(<div key="prev-29" className="py-3 text-sm text-gray-300">29</div>)
        days.push(<div key="prev-30" className="py-3 text-sm text-gray-300">30</div>)

        // Current month (May example)
        for (let i = 1; i <= 31; i++) {
            let className = "py-3 text-sm font-bold bg-driveflow-primary/5 rounded-lg border border-driveflow-primary/20 hover:bg-driveflow-primary/10 transition-colors"
            let content: React.ReactNode = i

            // Simulate some blocked dates (7, 8)
            if (i === 7 || i === 8) {
                className = "py-3 text-sm font-bold bg-red-50 text-red-500 rounded-lg border border-red-200 relative group overflow-hidden"
                content = (
                    <>
                        {i}
                        <span className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[10px]">close</span>
                        </span>
                    </>
                )
            }

            days.push(
                <button key={`day-${i}`} className={className} type="button">
                    {content}
                </button>
            )
        }
        return days
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#141117] dark:text-white font-display min-h-screen">
            <div className="flex min-h-screen overflow-hidden">
                <aside className="w-64 flex flex-col border-r border-[#e0dce5] dark:border-gray-700 bg-white dark:bg-background-dark p-6 sticky top-0 h-screen">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="size-10 bg-driveflow-primary rounded-xl flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">directions_car</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[#141117] dark:text-white text-lg font-bold leading-tight">DriveFlow</h1>
                            <p className="text-[#726487] dark:text-gray-400 text-xs font-normal">Fleet Management</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2 grow">
                        <a className="flex items-center gap-3 px-3 py-2.5 text-[#726487] hover:text-driveflow-primary transition-colors" href="/owner-dashboard">
                            <span className="material-symbols-outlined">dashboard</span>
                            <span className="text-sm font-medium">Dashboard</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-driveflow-primary/10 text-driveflow-primary" href="/owner/cars">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>list_alt</span>
                            <span className="text-sm font-medium">Listings</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 text-[#726487] hover:text-driveflow-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">calendar_today</span>
                            <span className="text-sm font-medium">Bookings</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 text-[#726487] hover:text-driveflow-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">chat_bubble</span>
                            <span className="text-sm font-medium">Messages</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 text-[#726487] hover:text-driveflow-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="text-sm font-medium">Reports</span>
                        </a>
                        <div className="mt-8 pt-8 border-t border-[#f2f0f4] dark:border-gray-800">
                            <a className="flex items-center gap-3 px-3 py-2.5 text-[#726487] hover:text-driveflow-primary transition-colors" href="#">
                                <span className="material-symbols-outlined">settings</span>
                                <span className="text-sm font-medium">Settings</span>
                            </a>
                        </div>
                    </nav>
                    <div className="mt-auto">
                        <div className="p-4 bg-driveflow-primary/5 rounded-xl border border-driveflow-primary/10">
                            <p className="text-xs text-[#726487] mb-2 uppercase tracking-wider font-bold">Pro Plan</p>
                            <p className="text-sm text-[#141117] dark:text-white font-medium mb-3">12/20 slots used</p>
                            <div className="h-1.5 w-full bg-driveflow-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-driveflow-primary" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-[1000px] mx-auto px-8 py-10">
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-8">
                                    <div className="flex items-center gap-2 group cursor-default">
                                        <span className="size-6 flex items-center justify-center rounded-full bg-driveflow-primary text-white text-[10px] font-bold">
                                            <span className="material-symbols-outlined text-xs">check</span>
                                        </span>
                                        <span className="text-sm font-medium text-[#726487]">Basic Details</span>
                                    </div>
                                    <div className="flex items-center gap-2 group cursor-default">
                                        <span className="size-6 flex items-center justify-center rounded-full bg-driveflow-primary text-white text-[10px] font-bold">
                                            <span className="material-symbols-outlined text-xs">check</span>
                                        </span>
                                        <span className="text-sm font-medium text-[#726487]">Media & Gallery</span>
                                    </div>
                                    <div className="flex items-center gap-2 group cursor-default">
                                        <span className="size-6 flex items-center justify-center rounded-full bg-driveflow-primary text-white text-[10px] font-bold">3</span>
                                        <span className="text-sm font-bold text-[#141117] dark:text-white border-b-2 border-driveflow-primary pb-0.5">Pricing & Availability</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-driveflow-primary uppercase tracking-tighter">Step 3 of 3</p>
                                    <p className="text-2xl font-black text-[#141117] dark:text-white">100% Complete</p>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-[#e0dce5] dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-driveflow-primary w-full"></div>
                            </div>
                        </div>
                        <header className="mb-12">
                            <h2 className="text-4xl font-black tracking-tight text-[#141117] dark:text-white mb-2">Set Your Terms</h2>
                            <p className="text-[#726487] dark:text-gray-400 text-lg">Define how much you'll earn and when your car is ready for the road.</p>
                        </header>
                        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Price per Day</label>
                                    <div className="relative flex items-center">
                                        <input
                                            className="form-input-minimal w-full bg-transparent text-[#141117] dark:text-white text-3xl font-black py-4 placeholder:text-[#e0dce5] border-0 border-b-2 border-[#e0dce5] rounded-none px-0 transition-colors focus:border-driveflow-primary focus:ring-0"
                                            placeholder="0.00"
                                            type="number"
                                            value={pricePerDay}
                                            onChange={(e) => setPricePerDay(e.target.value)}
                                        />
                                        <span className="text-xl font-bold text-[#726487] ml-2">MAD / DH</span>
                                    </div>
                                    <p className="text-xs text-[#726487] mt-2">Recommended: 450 - 600 MAD for this model</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Minimum Rental Duration</label>
                                    <div className="relative">
                                        <select
                                            className="form-input-minimal w-full bg-transparent text-[#141117] dark:text-white text-lg font-medium py-4 appearance-none border-0 border-b-2 border-[#e0dce5] rounded-none px-0 transition-colors focus:border-driveflow-primary focus:ring-0"
                                            value={minDuration}
                                            onChange={(e) => setMinDuration(e.target.value)}
                                        >
                                            <option>1 Day</option>
                                            <option>2 Days</option>
                                            <option>3 Days</option>
                                            <option>1 Week</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-4 pointer-events-none text-[#726487]">schedule</span>
                                    </div>
                                </div>
                            </section>
                            <section className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Pickup Location</label>
                                    <div className="relative">
                                        <input
                                            className="form-input-minimal w-full bg-transparent text-[#141117] dark:text-white text-lg font-medium py-3 placeholder:text-[#e0dce5] border-0 border-b-2 border-[#e0dce5] rounded-none px-0 transition-colors focus:border-driveflow-primary focus:ring-0"
                                            placeholder="Enter city or specific address"
                                            type="text"
                                            value={pickupLocation}
                                            onChange={(e) => setPickupLocation(e.target.value)}
                                            onFocus={() => setShowLocationDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                                        />
                                        <span className="material-symbols-outlined absolute right-0 top-3 pointer-events-none text-driveflow-primary">location_on</span>

                                        {showLocationDropdown && (
                                            <div className="absolute z-20 top-full left-0 w-full bg-white dark:bg-gray-800 border border-[#e0dce5] dark:border-gray-700 mt-1 shadow-xl rounded-xl overflow-hidden">
                                                <div
                                                    className="px-4 py-3 hover:bg-driveflow-primary/5 cursor-pointer border-b border-[#f2f0f4] dark:border-gray-700 flex items-center gap-3"
                                                    onClick={() => setPickupLocation('Casablanca, Maarif')}
                                                >
                                                    <span className="material-symbols-outlined text-[#726487] text-sm">history</span>
                                                    <div>
                                                        <p className="text-sm font-bold">Casablanca, Maarif</p>
                                                        <p className="text-[10px] text-[#726487]">Casablanca-Settat, Morocco</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className="px-4 py-3 hover:bg-driveflow-primary/5 cursor-pointer border-b border-[#f2f0f4] dark:border-gray-700 flex items-center gap-3"
                                                    onClick={() => setPickupLocation('Casablanca Anfa Airport (CAS)')}
                                                >
                                                    <span className="material-symbols-outlined text-[#726487] text-sm">location_on</span>
                                                    <div>
                                                        <p className="text-sm font-bold">Casablanca Anfa Airport (CAS)</p>
                                                        <p className="text-[10px] text-[#726487]">Morocco</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className="px-4 py-3 hover:bg-driveflow-primary/5 cursor-pointer flex items-center gap-3"
                                                    onClick={() => setPickupLocation('Casablanca Finance City')}
                                                >
                                                    <span className="material-symbols-outlined text-[#726487] text-sm">location_on</span>
                                                    <div>
                                                        <p className="text-sm font-bold">Casablanca Finance City</p>
                                                        <p className="text-[10px] text-[#726487]">Casablanca, Morocco</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                            <section className="space-y-6 pt-6">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Availability Calendar</label>
                                    <div className="flex gap-4">
                                        <button className="text-xs font-bold text-driveflow-primary underline" type="button">Mark all available</button>
                                        <button className="text-xs font-bold text-[#726487] underline" type="button">Block all dates</button>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-[#e0dce5] dark:border-gray-700 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h4 className="font-bold text-lg">May 2024</h4>
                                        <div className="flex gap-2">
                                            <button className="p-1 hover:bg-[#f2f0f4] dark:hover:bg-gray-700 rounded-lg transition-colors" type="button">
                                                <span className="material-symbols-outlined">chevron_left</span>
                                            </button>
                                            <button className="p-1 hover:bg-[#f2f0f4] dark:hover:bg-gray-700 rounded-lg transition-colors" type="button">
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="custom-calendar-grid grid grid-cols-7 gap-1 text-center mb-2">
                                        <div className="text-[10px] font-bold text-[#726487] uppercase">Mon</div>
                                        <div className="text-[10px] font-bold text-[#726487] uppercase">Tue</div>
                                        <div className="text-[10px] font-bold text-[#726487] uppercase">Wed</div>
                                        <div className="text-[10px] font-bold text-[#726487] uppercase">Thu</div>
                                        <div className="text-[10px] font-bold text-[#726487] uppercase">Fri</div>
                                        <div className="text-[10px] font-bold text-[#726487] uppercase">Sat</div>
                                        <div className="text-[10px] font-bold text-[#726487] uppercase">Sun</div>
                                    </div>
                                    <div className="custom-calendar-grid grid grid-cols-7 gap-1">
                                        {renderCalendarDays()}
                                    </div>
                                    <div className="mt-4 flex gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 bg-driveflow-primary/10 border border-driveflow-primary/20 rounded"></div>
                                            <span className="text-[10px] font-bold text-[#726487] uppercase">Available</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="size-3 bg-red-50 border border-red-200 rounded"></div>
                                            <span className="text-[10px] font-bold text-[#726487] uppercase">Blocked</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <footer className="pt-12 mt-12 border-t border-[#e0dce5] dark:border-gray-800 flex items-center justify-between">
                                <button
                                    className="text-[#726487] font-bold hover:text-[#141117] dark:hover:text-white flex items-center gap-2 transition-colors"
                                    type="button"
                                    onClick={handleBack}
                                >
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    Back to Media
                                </button>
                                <button
                                    className="px-10 py-4 bg-driveflow-primary text-white font-bold rounded-xl shadow-lg shadow-driveflow-primary/20 hover:shadow-driveflow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                                    type="button"
                                    onClick={handlePublish}
                                >
                                    Save & Publish Car
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                </button>
                            </footer>
                        </form>
                    </div>
                </main>
                <aside className="w-80 border-l border-[#e0dce5] dark:border-gray-700 bg-white dark:bg-background-dark p-8 hidden xl:block">
                    <h3 className="text-xl font-black mb-6">Pricing Tips</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-driveflow-primary">payments</span>
                            <div>
                                <p className="text-sm font-bold mb-1">Stay Competitive</p>
                                <p className="text-xs text-[#726487] leading-relaxed">Similar vehicles in Casablanca are priced between 400 and 600 MAD per day.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-driveflow-primary">event_busy</span>
                            <div>
                                <p className="text-sm font-bold mb-1">Flexibility Wins</p>
                                <p className="text-xs text-[#726487] leading-relaxed">Owners with flexible calendars and 1-day minimum durations receive 40% more bookings.</p>
                            </div>
                        </div>
                        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-driveflow-primary to-[#5e22b0] text-white">
                            <p className="text-sm font-bold mb-2">High Demand Alert</p>
                            <p className="text-xs opacity-90 mb-4">Summer season is approaching! Consider adjusting your weekend rates for maximum profit.</p>
                            <button className="w-full py-2.5 bg-white text-driveflow-primary rounded-lg text-xs font-black uppercase tracking-widest hover:bg-opacity-90 transition-all">
                                View Earnings Estimator
                            </button>
                        </div>
                        <div className="mt-8">
                            <div className="h-48 w-full rounded-xl bg-[#f2f0f4] dark:bg-gray-800 flex items-center justify-center border-2 border-dashed border-[#e0dce5] dark:border-gray-700 relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRs6ob7P9ufO-PdbhxrDvK9PWBGiAN30bwmrbTOrK06VWNFy7Dk5PU60hZy5Spnbch3JX5-DXKWQlywtlci64oeOdpza4FdV9OI27pL-zBlp8OlW9tFcMXu7KkBVG6dshDekzy5bEjvvYk6FxKAQDBj4aUvewFvfjdDHQdm1bgkhMFZzDC4CBDFvACXRE5PVd-RHSdfoWz9vyM8UCsBfWafa4O0rTzZdT-DMzsRbDV92nCa6QFhO8SscXHfHyJ3Sf7hUnn4kKMVCs')" }}></div>
                                <div className="text-center z-10 px-4">
                                    <span className="material-symbols-outlined text-4xl text-[#726487] mb-2">verified_user</span>
                                    <p className="text-xs font-medium text-[#726487]">Your car is covered by our insurance policy throughout every rental.</p>
                                    <p className="text-[10px] text-driveflow-primary font-bold mt-1 underline cursor-pointer">Learn More</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default AddCarPricing
