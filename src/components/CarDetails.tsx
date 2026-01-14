const CarDetails = () => {
    return (
        <main className="max-w-[1200px] mx-auto px-6 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 text-sm">
                <a className="text-[#726a81] hover:text-primary" href="#">Marketplace</a>
                <span className="text-[#726a81] material-symbols-outlined text-xs">chevron_right</span>
                <a className="text-[#726a81] hover:text-primary" href="#">Electric</a>
                <span className="text-[#726a81] material-symbols-outlined text-xs">chevron_right</span>
                <span className="font-semibold">Tesla Model Y</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Gallery and Content */}
                <div className="lg:col-span-8">
                    {/* Main Hero Image */}
                    <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 shadow-sm group relative">
                        <div className="absolute top-4 left-4 z-10">
                            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Top Rated</span>
                        </div>
                        <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Side profile of a white Tesla Model Y in a modern urban setting" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdoOg1D2T0jXxtPdScDx3EAtKWeXK1eXYloynfIgQx2BOvt23IEEDg3vUUrLK0JsQu8RcdyO9C4Fmpd0OsgEW3JVKNVw_jDuAMOgnaYTRZ6smf0Oc1o9GscWSTDczAfv7atBynIzQNdBcJO7ljlWWsF2KpMXf92bF07KDSFXdvGTNJtrMw2z0ymI73Zo8S13pVcB9jBLISs8eUMw6_jY6BHjbRRJIRkHtCKMNzkUp37vxabDqgx3Jyo-YqPIWii08X091nHQxBU")'}}>
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Tesla Model Y, 2023</h1>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                <span className="font-bold">4.92</span>
                                <span className="text-[#726a81] underline">(124 reviews)</span>
                            </div>
                            <span className="text-[#726a81]">•</span>
                            <div className="flex items-center gap-1 text-[#726a81]">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Specs Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-white/5 border border-[#f2f1f4] dark:border-white/10 p-4 rounded-xl flex flex-col gap-2">
                            <span className="material-symbols-outlined text-primary">event_seat</span>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-[#726a81] tracking-widest">Capacity</p>
                                <p className="font-bold">5 Seats</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/5 border border-[#f2f1f4] dark:border-white/10 p-4 rounded-xl flex flex-col gap-2">
                            <span className="material-symbols-outlined text-primary">settings_input_component</span>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-[#726a81] tracking-widest">Transmission</p>
                                <p className="font-bold">Automatic</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/5 border border-[#f2f1f4] dark:border-white/10 p-4 rounded-xl flex flex-col gap-2">
                            <span className="material-symbols-outlined text-primary">bolt</span>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-[#726a81] tracking-widest">Fuel Type</p>
                                <p className="font-bold">Electric</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/5 border border-[#f2f1f4] dark:border-white/10 p-4 rounded-xl flex flex-col gap-2">
                            <span className="material-symbols-outlined text-primary">speed</span>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-[#726a81] tracking-widest">Range</p>
                                <p className="font-bold">330 miles</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-3">About this vehicle</h3>
                        <p className="text-[#141216] dark:text-gray-300 leading-relaxed max-w-2xl">
                            Experience the future of driving with this 2023 long-range electric SUV.
                            Perfect for family road trips or stylish city commuting. Clean, quiet,
                            and fully loaded with autopilot features. The interior features vegan leather
                            and a premium sound system.
                        </p>
                    </div>

                    {/* Availability Calendar */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-4">Availability</h3>
                        <div className="bg-white dark:bg-white/5 border border-[#f2f1f4] dark:border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="font-bold">October 2023</h4>
                                <div className="flex gap-2">
                                    <button className="p-1 hover:bg-background-light dark:hover:bg-white/10 rounded"><span className="material-symbols-outlined">chevron_left</span></button>
                                    <button className="p-1 hover:bg-background-light dark:hover:bg-white/10 rounded"><span className="material-symbols-outlined">chevron_right</span></button>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#726a81] mb-2">
                                <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                            </div>
                            <div className="grid grid-cols-7 gap-2 text-center">
                                {/* Simple static calendar dates */}
                                <span className="p-2 text-gray-300">28</span><span className="p-2 text-gray-300">29</span><span className="p-2 text-gray-300">30</span>
                                <span className="p-2 font-medium">1</span><span className="p-2 font-medium">2</span><span className="p-2 font-medium">3</span><span className="p-2 font-medium">4</span>
                                <span className="p-2 font-medium">5</span><span className="p-2 font-medium">6</span><span className="p-2 font-medium">7</span><span className="p-2 font-medium">8</span>
                                <span className="p-2 font-medium bg-primary/10 text-primary rounded-lg border border-primary/20">9</span>
                                <span className="p-2 font-medium bg-primary/10 text-primary rounded-lg border border-primary/20">10</span>
                                <span className="p-2 font-medium bg-primary/10 text-primary rounded-lg border border-primary/20">11</span>
                                <span className="p-2 font-medium">12</span><span className="p-2 font-medium">13</span><span className="p-2 font-medium">14</span><span className="p-2 font-medium">15</span>
                                <span className="p-2 font-medium">16</span><span className="p-2 font-medium">17</span><span className="p-2 font-medium">18</span><span className="p-2 font-medium">19</span>
                                <span className="p-2 font-medium line-through text-gray-300">20</span><span className="p-2 font-medium line-through text-gray-300">21</span>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Gallery */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold mb-4">View Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="aspect-square rounded-lg overflow-hidden border border-[#f2f1f4] dark:border-white/10">
                                <div className="w-full h-full bg-cover bg-center" data-alt="Interior view of Tesla dashboard and steering wheel" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAu9ojAPmDhgGPiK42WHUYpcAAhnY_j_DnxWdeHwShBdxPnOcuZhp3G8gN9J51-teThLDp7SP2cC0Jojl7yRZXA9MoJ4ZRJ6-saS8wQc6iPSwSSI20vurewn7_EOS-pOHqqBODx7yn94RoXDJwgU3e-t0jccjcKRHYUiSteCNQvhOluWaAMHNmc92THJU-2WxSBDJPWTEDKeNQTjgb3kg8_evKHU7jX_X-4fDPaeU2HvtYJhQghqq6TqXtiD-WBokRKw7bJ1_LgMo")'}}></div>
                            </div>
                            <div className="aspect-square rounded-lg overflow-hidden border border-[#f2f1f4] dark:border-white/10">
                                <div className="w-full h-full bg-cover bg-center" data-alt="Tesla front trunk or frunk open" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ8fVexiQp7BgqFrZLkPkzT8AKxcYvxbf9P60n5iNakkQ5QSgxyBflce8mUZgL_aMbW6L55ounUj7xVe8nzQdR9Mpmm1-qX5EZ-phv5kHTaL_x92gU-JgZ5hAjFeCa81j-nu4txOaHkfI921vhp1cbVnczWbaGQ5UO6oJJUlE8RNAarTex7zifrZIUVC8VxQGdoHP1opPan0CR89c7MeqaaOH01unexdlK4gLBTmYvDdtj63l_0M_jq4p2xHC9HjoWHIX_1HvQPNo")'}}></div>
                            </div>
                            <div className="aspect-square rounded-lg overflow-hidden border border-[#f2f1f4] dark:border-white/10">
                                <div className="w-full h-full bg-cover bg-center" data-alt="Rear view showing the large trunk space" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPqdGPwCYsxO3FwGmKhIjjXjPQrBOizZQcBIsxMiTjSlLxZHLz-JzmSte9p13AqNpChCXivjIiHvntOENlcS-8741FPrYbEBNQIfQJyI_qbnvskevAsFwYW9gjMd-8tomUKlykBNkjLPVkfPRRmb4w59LYS8ByUIEWVxn_YGAns9KOIRHiaxr-OEirPAXxUDgHREsHuYB02lpPRhE4VTD7KWhIbTC6tgYnxRIsOgxSIeKMPB2j2-i2h06IJwzcUW6vYMn9FAMd8ns")'}}></div>
                            </div>
                            <div className="aspect-square rounded-lg overflow-hidden border border-[#f2f1f4] dark:border-white/10 relative">
                                <div className="w-full h-full bg-cover bg-center grayscale" data-alt="Tesla charging at a supercharger station" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4rA8xx6zdryOb8S3CwbObLWKk2B1asCO0zThSoElPqaPeb_F4DCNKukzh_dBpkuzDptAN-uINtdSY2MOm5riu3PKClQtoDUnXane_soa3GDSEHMUYpxsz3FpLmO_mxoUbOZqhA6dFQOYPNoXqY3D06rzSsBUSSQLiHbhN_Drd_RWIk7KCMMr6XY-y81gyes2XzT0T4SCR_6qb_vLLRKx5M01_G4kQrozfe43msiwHpvOVDDyY2fJh4ZT33SzT5TN0PLRGfg4NJe4")'}}></div>
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold">+12</div>
                            </div>
                        </div>
                    </div>

                    {/* Host Info */}
                    <div className="border-t border-[#f2f1f4] dark:border-white/10 pt-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
                                <img alt="Profile" className="w-full h-full object-cover" data-alt="Portrait of the car host, a smiling man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZgqoVwWRc6NXW5CmIcWQoMQVY-pex16ch4ehkTYAXsLCUGU5i5VoXzLp2HvUFu8AdOEjLZxlwaWUTgeHfNGAe26cwfc9PYjkuDkTwXUlQqhq8yA1TpXQtL4CHFki8XhFST2xywHejEPAI8BiypMak0XeXHPaxMhbxjnla1bFQOAl_pGuoVgufqvzvFO3ZBwPJzXOf6DCemK4wpBy042mwJcpSskBqoS7SlDQ1X9cNJjB2rJP9CPH6tnpD6mpDB94OhKDeZ0jRsn8"/>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Hosted by Alexander K.</p>
                                <p className="text-xs text-[#726a81]">Joined in 2021 • Response time: 1 hour</p>
                            </div>
                        </div>
                        <button className="text-primary font-bold text-sm border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/5">Contact Host</button>
                    </div>
                </div>

                {/* Right Column: Sticky Booking Card */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <div className="bg-white dark:bg-background-dark border-2 border-primary/10 rounded-2xl p-6 shadow-xl shadow-primary/5">
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-bold tracking-tight">$89</span>
                                <span className="text-[#726a81] font-medium">/ day</span>
                            </div>
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-2 gap-0 border border-[#f2f1f4] dark:border-white/10 rounded-xl overflow-hidden">
                                    <div className="p-3 border-r border-[#f2f1f4] dark:border-white/10 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer">
                                        <p className="text-[10px] font-bold uppercase text-[#726a81] tracking-tighter">Pickup</p>
                                        <p className="text-sm font-medium">Oct 9, 10:00 AM</p>
                                    </div>
                                    <div className="p-3 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer">
                                        <p className="text-[10px] font-bold uppercase text-[#726a81] tracking-tighter">Return</p>
                                        <p className="text-sm font-medium">Oct 11, 10:00 AM</p>
                                    </div>
                                </div>
                                <div className="p-3 border border-[#f2f1f4] dark:border-white/10 rounded-xl hover:bg-background-light dark:hover:bg-white/5 cursor-pointer flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-[#726a81] tracking-tighter">Delivery</p>
                                        <p className="text-sm font-medium">SFO Airport Terminal 1</p>
                                    </div>
                                    <span className="material-symbols-outlined text-[#726a81]">expand_more</span>
                                </div>
                            </div>
                            <div className="space-y-3 mb-8 border-t border-[#f2f1f4] dark:border-white/10 pt-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#726a81]">$89.00 x 3 days</span>
                                    <span className="font-medium">$267.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#726a81]">Trip fee</span>
                                    <span className="font-medium">$15.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-accent font-bold">Promotion: EARLYBIRD</span>
                                    <span className="text-accent font-bold">-$25.00</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-dashed border-[#f2f1f4] dark:border-white/10">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-lg">$257.00</span>
                                </div>
                            </div>
                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 mb-4">
                                Book Now
                                <span className="material-symbols-outlined text-sm">bolt</span>
                            </button>
                            <p className="text-center text-xs text-[#726a81]">You won't be charged yet</p>
                        </div>
                        <div className="mt-6 p-4 bg-accent/10 rounded-xl flex items-start gap-3 border border-accent/20">
                            <span className="material-symbols-outlined text-accent">verified_user</span>
                            <div>
                                <p className="text-xs font-bold text-accent uppercase tracking-wider">Premium Protection</p>
                                <p className="text-xs text-[#141216]/70 dark:text-white/70 mt-1 leading-snug">Full insurance coverage included for this trip with zero deductible.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CarDetails;