import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AddCarBasic = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [seatCount, setSeatCount] = useState(4)

    // State for form fields
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '2024',
        bodyStyle: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Electric (EV)'
    })

    // Initialize state from location if available (when coming back from Step 2)
    useEffect(() => {
        if (location.state) {
            setFormData(prev => ({ ...prev, ...location.state }))
            if (location.state.seatCount) {
                setSeatCount(location.state.seatCount)
            }
        }
    }, [location.state])

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleContinue = () => {
        navigate('/owner/cars/new/media', {
            state: {
                ...formData,
                seatCount
            }
        })
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#141117] dark:text-white font-display min-h-screen">
            <div className="flex min-h-screen overflow-hidden">
                {/* Sidebar Navigation */}
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
                {/* Main Content area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-[1000px] mx-auto px-8 py-10">
                        {/* Progress Indicator */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-8">
                                    <div className="flex items-center gap-2 group cursor-default">
                                        <span className="size-6 flex items-center justify-center rounded-full bg-driveflow-primary text-white text-[10px] font-bold">1</span>
                                        <span className="text-sm font-bold text-[#141117] dark:text-white border-b-2 border-driveflow-primary pb-0.5">Basic Details</span>
                                    </div>
                                    <div className="flex items-center gap-2 group cursor-default opacity-40">
                                        <span className="size-6 flex items-center justify-center rounded-full bg-[#e0dce5] text-[#726487] text-[10px] font-bold">2</span>
                                        <span className="text-sm font-medium text-[#726487]">Media & Gallery</span>
                                    </div>
                                    <div className="flex items-center gap-2 group cursor-default opacity-40">
                                        <span className="size-6 flex items-center justify-center rounded-full bg-[#e0dce5] text-[#726487] text-[10px] font-bold">3</span>
                                        <span className="text-sm font-medium text-[#726487]">Pricing</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-driveflow-primary uppercase tracking-tighter">Step 1 of 3</p>
                                    <p className="text-2xl font-black text-[#141117] dark:text-white">33% Complete</p>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-[#e0dce5] dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-driveflow-primary w-1/3"></div>
                            </div>
                        </div>
                        {/* Page Header */}
                        <header className="mb-12">
                            <h2 className="text-4xl font-black tracking-tight text-[#141117] dark:text-white mb-2">Add New Car</h2>
                            <p className="text-[#726487] dark:text-gray-400 text-lg">Introduce your vehicle to the community with high-level specifications.</p>
                        </header>
                        {/* Form Section */}
                        <form className="space-y-12">
                            {/* Identity Group */}
                            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Brand</label>
                                    <div className="relative">
                                        <select
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleChange}
                                            className="form-input-minimal w-full bg-transparent text-[#141117] dark:text-white text-lg font-medium py-3 focus:outline-none appearance-none border-0 border-b-2 border-[#e0dce5] rounded-none px-0 transition-colors focus:border-driveflow-primary focus:ring-0"
                                        >
                                            <option disabled value="">Select Manufacturer</option>
                                            <option value="Tesla">Tesla</option>
                                            <option value="BMW">BMW</option>
                                            <option value="Porsche">Porsche</option>
                                            <option value="Audi">Audi</option>
                                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-3 pointer-events-none text-[#726487]">expand_more</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Model</label>
                                    <input
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        className="form-input-minimal w-full bg-transparent text-[#141117] dark:text-white text-lg font-medium py-3 placeholder:text-[#e0dce5] border-0 border-b-2 border-[#e0dce5] rounded-none px-0 transition-colors focus:border-driveflow-primary focus:ring-0"
                                        placeholder="e.g. Model 3 Highland"
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Year</label>
                                    <div className="relative">
                                        <select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            className="form-input-minimal w-full bg-transparent text-[#141117] dark:text-white text-lg font-medium py-3 appearance-none border-0 border-b-2 border-[#e0dce5] rounded-none px-0 transition-colors focus:border-driveflow-primary focus:ring-0"
                                        >
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-3 pointer-events-none text-[#726487]">calendar_month</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Seats</label>
                                    <div className="flex items-center gap-6 py-1">
                                        <button
                                            className="size-10 rounded-full border-2 border-[#e0dce5] flex items-center justify-center hover:border-driveflow-primary text-[#141117] dark:text-white transition-all"
                                            type="button"
                                            onClick={() => setSeatCount(prev => Math.max(1, prev - 1))}
                                        >
                                            <span className="material-symbols-outlined">remove</span>
                                        </button>
                                        <span className="text-2xl font-bold w-4 text-center">{seatCount}</span>
                                        <button
                                            className="size-10 rounded-full border-2 border-driveflow-primary bg-driveflow-primary/5 flex items-center justify-center text-driveflow-primary transition-all"
                                            type="button"
                                            onClick={() => setSeatCount(prev => prev + 1)}
                                        >
                                            <span className="material-symbols-outlined">add</span>
                                        </button>
                                    </div>
                                </div>
                            </section>
                            {/* Specs Group */}
                            <section className="space-y-8">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487] block mb-4">Body Style</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Sedan', 'SUV', 'Coupe', 'Electric', 'Luxury'].map((style) => (
                                            <label key={style} className="cursor-pointer group">
                                                <input
                                                    name="bodyStyle"
                                                    type="radio"
                                                    value={style}
                                                    checked={formData.bodyStyle === style}
                                                    onChange={handleChange}
                                                    className="hidden peer"
                                                />
                                                <div className="px-6 py-3 rounded-full border-2 border-[#e0dce5] peer-checked:border-driveflow-primary peer-checked:bg-driveflow-primary peer-checked:text-white text-[#726487] font-medium transition-all group-hover:border-[#726487] peer-checked:group-hover:border-driveflow-primary">
                                                    {style}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#726487] block mb-4">Transmission</label>
                                        <div className="flex p-1 bg-white dark:bg-gray-800 rounded-lg border border-[#e0dce5] dark:border-gray-700">
                                            {['Automatic', 'Manual'].map((type) => (
                                                <label key={type} className="flex-1 cursor-pointer">
                                                    <input
                                                        name="transmission"
                                                        type="radio"
                                                        value={type}
                                                        checked={formData.transmission === type}
                                                        onChange={handleChange}
                                                        className="hidden peer"
                                                    />
                                                    <div className="text-center py-2.5 rounded text-sm font-bold peer-checked:bg-driveflow-primary peer-checked:text-white text-[#726487] transition-all">
                                                        {type}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#726487] block mb-4">Fuel Type</label>
                                        <div className="relative">
                                            <select
                                                name="fuelType"
                                                value={formData.fuelType}
                                                onChange={handleChange}
                                                className="form-input-minimal w-full bg-transparent text-[#141117] dark:text-white text-lg font-medium py-3 appearance-none border-0 border-b-2 border-[#e0dce5] rounded-none px-0 transition-colors focus:border-driveflow-primary focus:ring-0"
                                            >
                                                <option value="Electric (EV)">Electric (EV)</option>
                                                <option value="Petrol">Petrol</option>
                                                <option value="Diesel">Diesel</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-0 top-3 pointer-events-none text-[#726487]">ev_station</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* Footer Actions */}
                            <footer className="pt-12 mt-12 border-t border-[#e0dce5] dark:border-gray-800 flex items-center justify-between">
                                <button
                                    className="text-[#726487] font-bold hover:text-[#141117] dark:hover:text-white flex items-center gap-2 transition-colors"
                                    type="button"
                                    onClick={() => navigate('/owner/cars')}
                                >
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    Back to Dashboard
                                </button>
                                <button
                                    className="px-10 py-4 bg-driveflow-primary text-white font-bold rounded-xl shadow-lg shadow-driveflow-primary/20 hover:shadow-driveflow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                                    type="button"
                                    onClick={handleContinue}
                                >
                                    Continue to Media
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </footer>
                        </form>
                    </div>
                </main>
                {/* Right Assist Panel */}
                <aside className="w-80 border-l border-[#e0dce5] dark:border-gray-700 bg-white dark:bg-background-dark p-8 hidden xl:block">
                    <h3 className="text-xl font-black mb-6">Listing Tips</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-driveflow-primary">info</span>
                            <div>
                                <p className="text-sm font-bold mb-1">Be Accurate</p>
                                <p className="text-xs text-[#726487] leading-relaxed">Entering the correct year and model ensures your listing appears in relevant search filters for potential renters.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-driveflow-primary">verified</span>
                            <div>
                                <p className="text-sm font-bold mb-1">Instant Verification</p>
                                <p className="text-xs text-[#726487] leading-relaxed">Modern EV details are often automatically cross-referenced with regional registries for faster approval.</p>
                            </div>
                        </div>
                        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-driveflow-primary to-[#5e22b0] text-white">
                            <p className="text-sm font-bold mb-2">Need help?</p>
                            <p className="text-xs opacity-90 mb-4">Our fleet specialists are ready to assist you in optimizing your listing.</p>
                            <button className="w-full py-2.5 bg-white text-driveflow-primary rounded-lg text-xs font-black uppercase tracking-widest hover:bg-opacity-90 transition-all">
                                Chat with Support
                            </button>
                        </div>
                        <div className="mt-8">
                            <div className="h-48 w-full rounded-xl bg-[#f2f0f4] dark:bg-gray-800 flex items-center justify-center border-2 border-dashed border-[#e0dce5] dark:border-gray-700 relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center opacity-10" data-alt="Subtle map texture for UI background" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRs6ob7P9ufO-PdbhxrDvK9PWBGiAN30bwmrbTOrK06VWNFy7Dk5PU60hZy5Spnbch3JX5-DXKWQlywtlci64oeOdpza4FdV9OI27pL-zBlp8OlW9tFcMXu7KkBVG6dshDekzy5bEjvvYk6FxKAQDBj4aUvewFvfjdDHQdm1bgkhMFZzDC4CBDFvACXRE5PVd-RHSdfoWz9vyM8UCsBfWafa4O0rTzZdT-DMzsRbDV92nCa6QFhO8SscXHfHyJ3Sf7hUnn4kKMVCs')" }}></div>
                                <div className="text-center z-10 px-4">
                                    <span className="material-symbols-outlined text-4xl text-[#726487] mb-2">map</span>
                                    <p className="text-xs font-medium text-[#726487]">Your listing will be visible to users in San Francisco</p>
                                    <p className="text-[10px] text-driveflow-primary font-bold mt-1 underline cursor-pointer">Change Location</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default AddCarBasic
