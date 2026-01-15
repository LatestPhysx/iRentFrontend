import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AddCarMedia = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const previousData = location.state || {}

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
        navigate('/owner/cars/new', { state: previousData })
    }

    const handleContinue = () => {
        // Pass all accumulated data to the final step (Pricing)
        navigate('/owner/cars/new/pricing', { state: previousData })
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
                                        <span className="size-6 flex items-center justify-center rounded-full bg-green-500 text-white text-[10px] font-bold">
                                            <span className="material-symbols-outlined text-[14px]">check</span>
                                        </span>
                                        <span className="text-sm font-medium text-[#726487]">Basic Details</span>
                                    </div>
                                    <div className="flex items-center gap-2 group cursor-default">
                                        <span className="size-6 flex items-center justify-center rounded-full bg-driveflow-primary text-white text-[10px] font-bold">2</span>
                                        <span className="text-sm font-bold text-[#141117] dark:text-white border-b-2 border-driveflow-primary pb-0.5">Media & Gallery</span>
                                    </div>
                                    <div className="flex items-center gap-2 group cursor-default opacity-40">
                                        <span className="size-6 flex items-center justify-center rounded-full bg-[#e0dce5] text-[#726487] text-[10px] font-bold">3</span>
                                        <span className="text-sm font-medium text-[#726487]">Pricing</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-driveflow-primary uppercase tracking-tighter">Step 2 of 3</p>
                                    <p className="text-2xl font-black text-[#141117] dark:text-white">66% Complete</p>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-[#e0dce5] dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-driveflow-primary w-2/3"></div>
                            </div>
                        </div>
                        <header className="mb-12">
                            <h2 className="text-4xl font-black tracking-tight text-[#141117] dark:text-white mb-2">Media & Gallery</h2>
                            <p className="text-[#726487] dark:text-gray-400 text-lg">High-quality photos increase your booking rate by up to 3x.</p>
                        </header>
                        <form className="space-y-12">
                            <section className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                                    <div className="lg:col-span-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#726487] block mb-4">Primary Photo</label>
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group border-2 border-driveflow-primary">
                                            <img alt="Primary car photo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG5STDuUsalCX9nrzG5w0PH2_0ZLjZqTPvXCe38oRCZ5Q_pQJSwt3AzTfBAisMbywe6IOvuPhN0t9YgCYT0ooLZ77ByGAF1CxU1Z9IijkMrkStqVjyDJY0uFnWU7L0pk9LFPfLyvqbGXSs-PuUThD33CBy_2yzIA2Begi5d9CNE0FHCwX6lmGHprK3VmL2UUTNy3kwxD3aftuTk525fJaaDMQ-7qibzIy-Azr3rXJEJDb3BjhSnmDjlwMk_XrqFyrhU74oe7tZq54" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                                                <div className="flex justify-between items-center">
                                                    <span className="px-3 py-1 bg-driveflow-primary text-white text-[10px] font-bold uppercase rounded-full">Cover Image</span>
                                                    <div className="flex gap-2">
                                                        <button className="size-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all" type="button">
                                                            <span className="material-symbols-outlined text-xl">edit</span>
                                                        </button>
                                                        <button className="size-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all" type="button">
                                                            <span className="material-symbols-outlined text-xl">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-2 flex flex-col gap-6">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#726487] block">Additional Images</label>
                                        <div className="grid grid-cols-2 gap-4 h-full">
                                            <div className="relative rounded-xl overflow-hidden group aspect-square">
                                                <img alt="Car interior" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqfNai7yANxKeqYjjDSToOwETE2Zpa-ed0mqA8zGAASFPeyHZYGYKMtyhoI3d-XhoS1_Z-JH3Hq85A53ej3P9-0XyMjFWHoz0NzFIT9Qi_kzXR0zGWvUwnJHHlnV3-MTbfeHELKimOnR8RXfHF1l35pGW2LMhYjTdXuKNUg-G_ruiYI8-o5VtrddWVsJQ-99JpP1Sk_dkigWOCx3m-0PwWrKz8uLHniElZcfnfA3qJPTzH3S4cmg_iYqyJmEIp0XLLNB8RUYG_Ev8" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button className="size-8 bg-white text-driveflow-primary rounded-full flex items-center justify-center shadow-lg" type="button"><span className="material-symbols-outlined text-sm">edit</span></button>
                                                    <button className="size-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg" type="button"><span className="material-symbols-outlined text-sm">delete</span></button>
                                                </div>
                                            </div>
                                            <div className="relative rounded-xl overflow-hidden group aspect-square">
                                                <img alt="Car rear" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA709SmyjHrpdsUl087f_wEyD9vHMeaOgKlLzXS9ne6BS3xmP4JJvoLmuBhLF8vY8PskBjC2vFEB915kcgl194hXgFHo-N-1Yfyd22XTchEh-ViVjQZP4Xm2lz2eql9G2eCIuClV0cn-Rtip_v-elIqhwXt1-8fQ0isK6NpNi6VryZmYOorjEfloOotMq8AOlgVwzfw1Ec_wvEmOeXtZ7GDL19lEt3nRzFfUIPTVsJhnS0SDtE-AnG7ZSpaFfHjC9JdGwGfIkSLN8o" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button className="size-8 bg-white text-driveflow-primary rounded-full flex items-center justify-center shadow-lg" type="button"><span className="material-symbols-outlined text-sm">edit</span></button>
                                                    <button className="size-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg" type="button"><span className="material-symbols-outlined text-sm">delete</span></button>
                                                </div>
                                            </div>
                                            <div className="relative rounded-xl overflow-hidden group aspect-square">
                                                <img alt="Car dash" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_Qknc6oFzOWg0u2vgkYYvGckIzh4crESn2WAV9zYnGgllWKCSi8E1HA2mOAtkJBlkYfwZdcrgTk1UBs7L918DUBivvqgK_d4opr40WQIMvqT5VUOjmjTQ5Zv7QeGnEB75KF8J2FpK0hwfHGww2e1adbXuMOUqSQKZm9caX6dsHwjUNGjOBDDQkcBIx2RFnJdy8XCfJ24sMk8RgWyXiYYRXwajxlQQ8ydfRHGgujhfN4SmQo22UwaFX8xzXmTsoKBABmEBHaist2E" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <button className="size-8 bg-white text-driveflow-primary rounded-full flex items-center justify-center shadow-lg" type="button"><span className="material-symbols-outlined text-sm">edit</span></button>
                                                    <button className="size-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg" type="button"><span className="material-symbols-outlined text-sm">delete</span></button>
                                                </div>
                                            </div>
                                            <button className="rounded-xl border-2 border-dashed border-[#e0dce5] dark:border-gray-700 flex flex-col items-center justify-center gap-2 hover:border-driveflow-primary hover:bg-driveflow-primary/5 transition-all aspect-square" type="button">
                                                <span className="material-symbols-outlined text-3xl text-[#726487]">add_photo_alternate</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#726487]">Upload</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="space-y-6 pt-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#726487]">Rental Rules & Guidelines</label>
                                    <textarea
                                        className="form-input-minimal w-full bg-transparent text-[#141117] dark:text-white text-base font-normal py-3 placeholder:text-[#e0dce5] resize-none border-0 border-b-2 border-[#e0dce5] px-0 focus:border-driveflow-primary focus:ring-0"
                                        placeholder="e.g. No smoking, No pets, Please return with a full charge/tank..."
                                        rows={4}
                                    ></textarea>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input defaultChecked className="size-5 rounded border-[#e0dce5] text-driveflow-primary focus:ring-driveflow-primary" type="checkbox" />
                                        <span className="text-sm font-medium text-[#141117] dark:text-white">Allow instant booking</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input className="size-5 rounded border-[#e0dce5] text-driveflow-primary focus:ring-driveflow-primary" type="checkbox" />
                                        <span className="text-sm font-medium text-[#141117] dark:text-white">Long-term discounts</span>
                                    </label>
                                </div>
                            </section>
                            <footer className="pt-12 mt-12 border-t border-[#e0dce5] dark:border-gray-800 flex items-center justify-between">
                                <button
                                    className="text-[#726487] font-bold hover:text-[#141117] dark:hover:text-white flex items-center gap-2 transition-colors"
                                    type="button"
                                    onClick={handleBack}
                                >
                                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                                    Back to Details
                                </button>
                                <button
                                    className="px-10 py-4 bg-driveflow-primary text-white font-bold rounded-xl shadow-lg shadow-driveflow-primary/20 hover:shadow-driveflow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                                    type="button"
                                    onClick={handleContinue}
                                >
                                    Continue to Pricing
                                    <span className="material-symbols-outlined">payments</span>
                                </button>
                            </footer>
                        </form>
                    </div>
                </main>
                <aside className="w-80 border-l border-[#e0dce5] dark:border-gray-700 bg-white dark:bg-background-dark p-8 hidden xl:block">
                    <h3 className="text-xl font-black mb-6">Listing Tips</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-driveflow-primary">photo_camera</span>
                            <div>
                                <p className="text-sm font-bold mb-1">Golden Hour</p>
                                <p className="text-xs text-[#726487] leading-relaxed">Shoot during sunrise or sunset for the best lighting. Avoid harsh midday sun reflections.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-driveflow-primary">cleaning_services</span>
                            <div>
                                <p className="text-sm font-bold mb-1">Clean Matters</p>
                                <p className="text-xs text-[#726487] leading-relaxed">Ensure the car is vacuumed and washed. Clear photos of the dashboard and trunk are highly valued.</p>
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
                                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrPtYlFWCpOTE4ufxqCUuUR7UQ9qHQGq9QEKNm-QXkmWOA0u8CpTf0HvJdVHFTtNUMbIIGVoRjN6MiOhwjiSAobaDxtu4pi7I8_PKPhOQTS6JVPVDZLOVQuvEF6lmStR35ciNO5pHCKfYQDa3VZ-idDPvgnSUQdi2InNRvXdwOhBcpBXt_wxLKmVsET13PXVh8-H_fSCh73YwzzYOhqtBhpoISNNr-T3VwvttgTEIcewzIBj4fHdLqs2LEgvRukLKIKF6Chvexkio')" }}></div>
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

export default AddCarMedia
