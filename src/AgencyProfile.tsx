import { Link } from 'react-router-dom'

const AgencyProfile = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#141216] dark:text-white font-display min-h-screen">
            {/* Navigation */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e0dde3] dark:border-[#2e2a36]">
                <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/owner-dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-xl">account_balance</span>
                            </div>
                            <h2 className="text-lg font-bold tracking-tight">Apex Realty</h2>
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-sm font-medium text-[#726a81] hover:text-primary transition-colors" to="/owner-dashboard">Dashboard</Link>
                        <Link className="text-sm font-medium text-[#726a81] hover:text-primary transition-colors" to="/owner/cars">Rentals</Link>
                        <a className="text-sm font-medium text-[#726a81] hover:text-primary transition-colors" href="#">Messages</a>
                        <Link className="text-sm font-medium text-primary border-b-2 border-primary py-5" to="/owner/agency-profile">Settings</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-cover bg-center" data-alt="Small agency profile avatar icon" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8iXQgccTqOD35m20q4DIpCTq2xZ7qo_bDXZvrZqcljYow9-QCjRTqvspaMlUNtvu1ChfyBHY6WFUt05t5OVP9iiUKFaXtBD-ua3RbZUl8kAMEb6TPy7bZX4C5qilI1knu9iK-ac6z6KhfaqCGwKuug6tDekA-Jnzmf542ZKzFZSKUkTmIlaC8tGdTZCjILIw298JZo64kQRtwQBSCuJKBYHWaShDdt-SEzoyPriDw77yIrcYxKvIvWcsVO9l4qPo4UksOH9hGaY0')" }}></div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-[960px] mx-auto px-6 py-10">
                {/* Profile Header Section */}
                <section className="mb-8">
                    <div className="bg-white dark:bg-[#1f1b26] border border-[#e0dde3] dark:border-[#2e2a36] rounded-xl p-8 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <div className="size-32 rounded-full border-4 border-white dark:border-[#1f1b26] shadow-xl overflow-hidden bg-white">
                                <div className="w-full h-full bg-cover bg-center" data-alt="Apex Realty corporate headquarters building logo" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBuhm2ocTuLSyY0qWxoRcmhLvbfWE4FQs3L_0WiiEeevOhVHpN2n4jAWkcYuZmOnN25sE9onTunRA5aZE6G-Es2j-tDJJ-s9cr8TPHNuuNkQtDWL50UacTiEBM9T5wPEa13ZDAps2iCugXTKEMKpnSvlWMeWVsnp25ycToIzZlYlOt9Wmk5rRjvudwrNsLDBPJfcEDYKyuOiqFxxF6hJvvc6oLacDylLtmegVlQJfP3ysWd3p84y-WPvTjRyUJSql_vcRJUb3YI28I')" }}></div>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-primary text-white size-8 rounded-full flex items-center justify-center border-4 border-white dark:border-[#1f1b26]">
                                <span className="material-symbols-outlined text-base">verified</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-1">Apex Realty</h1>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">Verified Owner</span>
                        </div>
                        <p className="text-[#726a81] dark:text-gray-400 text-sm">Managing premium properties in Greater London</p>
                    </div>
                </section>
                {/* Stats Grid (Bento Style) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <div className="bg-white dark:bg-[#1f1b26] border border-[#e0dde3] dark:border-[#2e2a36] rounded-xl p-6">
                        <p className="text-[#726a81] text-xs font-bold uppercase tracking-wider mb-2">Completed Rentals</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">15</span>
                            <span className="text-emerald-500 text-sm font-medium flex items-center"><span className="material-symbols-outlined text-sm">trending_up</span> +2</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#1f1b26] border border-[#e0dde3] dark:border-[#2e2a36] rounded-xl p-6">
                        <p className="text-[#726a81] text-xs font-bold uppercase tracking-wider mb-2">Account Age</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">1 Year</span>
                        </div>
                        <p className="text-xs text-[#726a81] mt-1">Joined January 2023</p>
                    </div>
                    <div className="bg-white dark:bg-[#1f1b26] border border-[#e0dde3] dark:border-[#2e2a36] rounded-xl p-6">
                        <p className="text-[#726a81] text-xs font-bold uppercase tracking-wider mb-2">Response Rate</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">98%</span>
                            <span className="material-symbols-outlined text-primary text-sm">bolt</span>
                        </div>
                    </div>
                </section>
                {/* Form & Upload Section */}
                <div className="space-y-8">
                    <section className="bg-white dark:bg-[#1f1b26] border border-[#e0dde3] dark:border-[#2e2a36] rounded-xl overflow-hidden">
                        <div className="px-8 pt-8 pb-4">
                            <h2 className="text-xl font-bold">Contact Information</h2>
                            <p className="text-sm text-[#726a81]">These details will be shown to potential tenants.</p>
                        </div>
                        <div className="px-8 pb-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold">Full Name</span>
                                    <input className="w-full h-12 rounded-lg border-[#e0dde3] dark:border-[#2e2a36] bg-transparent focus:ring-primary focus:border-primary px-4" type="text" defaultValue="Apex Realty Solutions" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold">Professional Email</span>
                                    <input className="w-full h-12 rounded-lg border-[#e0dde3] dark:border-[#2e2a36] bg-transparent focus:ring-primary focus:border-primary px-4" type="email" defaultValue="contact@apexrealty.com" />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold">Phone Number</span>
                                    <input className="w-full h-12 rounded-lg border-[#e0dde3] dark:border-[#2e2a36] bg-transparent focus:ring-primary focus:border-primary px-4" type="tel" defaultValue="+44 20 7946 0123" />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-semibold">Office Address</span>
                                    <input className="w-full h-12 rounded-lg border-[#e0dde3] dark:border-[#2e2a36] bg-transparent focus:ring-primary focus:border-primary px-4" type="text" defaultValue="22 Baker Street, London" />
                                </label>
                            </div>
                        </div>
                    </section>
                    <section className="bg-white dark:bg-[#1f1b26] border border-[#e0dde3] dark:border-[#2e2a36] rounded-xl overflow-hidden">
                        <div className="px-8 pt-8 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">Trust & Verification</h2>
                                    <p className="text-sm text-[#726a81]">Verify your identity to increase your visibility and trust score.</p>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-xs font-bold">
                                    <span className="material-symbols-outlined text-sm">lock</span>
                                    SECURE
                                </div>
                            </div>
                        </div>
                        <div className="px-8 pb-8 space-y-8">
                            {/* ID Upload */}
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1 space-y-2">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">badge</span>
                                        Government ID
                                    </h3>
                                    <p className="text-xs text-[#726a81]">Passport or Driver's License. Required for the "Verified" badge.</p>
                                </div>
                                <div className="w-full md:w-80 h-32 border-2 border-dashed border-[#e0dde3] dark:border-[#2e2a36] rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-primary/5 transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                                    <span className="text-xs font-medium">Click to upload or drag & drop</span>
                                </div>
                            </div>
                            <hr className="border-[#e0dde3] dark:border-[#2e2a36]" />
                            {/* License Upload */}
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1 space-y-2">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">contract</span>
                                        Business License
                                    </h3>
                                    <p className="text-xs text-[#726a81]">Company registration or real estate brokerage license document.</p>
                                </div>
                                <div className="w-full md:w-80 h-32 border-2 border-dashed border-[#e0dde3] dark:border-[#2e2a36] rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-primary/5 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-lg text-xs font-bold uppercase tracking-tight">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                        Verified: license_2023.pdf
                                    </div>
                                    <span className="text-[10px] text-[#726a81]">Uploaded Feb 12, 2023</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* Sticky Action Bar */}
                <div className="mt-12 flex items-center justify-between p-6 bg-white dark:bg-[#1f1b26] border border-primary/20 rounded-xl shadow-lg shadow-primary/5 sticky bottom-6 z-40">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">info</span>
                        <p className="text-sm font-medium">Your data is encrypted and used only for verification.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-[#726a81] hover:bg-[#f7f6f8] dark:hover:bg-[#2e2a36] transition-colors">Discard</button>
                        <button className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 hover:opacity-90 transition-all">Save Changes</button>
                    </div>
                </div>
            </main>
            <footer className="max-w-[1200px] mx-auto px-6 py-12 text-center">
                <p className="text-xs text-[#726a81]">© 2024 Apex Realty Solutions. All rights reserved. Professional real estate management platform.</p>
            </footer>
        </div>
    )
}

export default AgencyProfile
