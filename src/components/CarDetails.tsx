import { useState } from 'react';

const CarDetails = () => {
    const [selectedDates, setSelectedDates] = useState<{ start: number | null, end: number | null }>({ start: null, end: null });
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // Mock images
    const mainImage = "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
    const galleryImages = [
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1627915330833-8a303a7431c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ];

    const handleDateClick = (day: number) => {
        if (!selectedDates.start || (selectedDates.start && selectedDates.end)) {
            setSelectedDates({ start: day, end: null });
        } else {
            // Ensure end is after start
            if (day > selectedDates.start) {
                setSelectedDates(prev => ({ ...prev, end: day }));
            } else {
                setSelectedDates({ start: day, end: null });
            }
        }
    };



    const isRangeStart = (day: number) => selectedDates.start === day;
    const isRangeEnd = (day: number) => selectedDates.end === day;
    const isInRange = (day: number) => selectedDates.start && selectedDates.end && day > selectedDates.start && day < selectedDates.end;

    return (
        <main className="max-w-[1200px] mx-auto px-6 py-8 relative">
            {/* Gallery Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm overflow-y-auto">
                    <div className="min-h-screen p-6">
                        <button
                            onClick={() => setIsGalleryOpen(false)}
                            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="max-w-6xl mx-auto mt-10">
                            <h2 className="text-white text-3xl font-bold mb-8">Image Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {galleryImages.map((img, index) => (
                                    <div key={index} className="aspect-video rounded-xl overflow-hidden bg-gray-800">
                                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                    <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 shadow-sm group relative bg-gray-100 dark:bg-zinc-800">
                        <div className="absolute top-4 left-4 z-10 w-full flex justify-between pr-8">
                            <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Top Rated</span>
                        </div>
                        <img
                            src={mainImage}
                            alt="Tesla Model Y"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
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

                    {/* Availability Calendar (Interactive) */}
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
                            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#726a81] mb-2">
                                <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center">
                                {/* Disabled previous month days */}
                                {[28, 29, 30].map(day => (
                                    <span key={day} className="p-3 text-gray-300 dark:text-gray-700 text-sm">{day}</span>
                                ))}

                                {/* Days 1-31 */}
                                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                                    const isStart = isRangeStart(day);
                                    const isEnd = isRangeEnd(day);
                                    const inRange = isInRange(day);

                                    let bgClass = "hover:bg-gray-100 dark:hover:bg-white/5";
                                    let textClass = "text-gray-700 dark:text-gray-200";

                                    if (isStart || isEnd) {
                                        bgClass = "bg-primary text-white shadow-md shadow-primary/30";
                                        textClass = "text-white font-bold";
                                    } else if (inRange) {
                                        bgClass = "bg-primary/10 text-primary";
                                        textClass = "text-primary font-bold";
                                    }

                                    return (
                                        <button
                                            key={day}
                                            onClick={() => handleDateClick(day)}
                                            className={`p-3 rounded-lg text-sm transition-all duration-200 ${bgClass} ${textClass}`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Gallery */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">View Gallery</h3>
                            <button onClick={() => setIsGalleryOpen(true)} className="text-primary text-sm font-bold hover:underline">See all photos</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {galleryImages.slice(0, 3).map((img, idx) => (
                                <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-[#f2f1f4] dark:border-white/10 cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-110" style={{ backgroundImage: `url("${img}")` }}></div>
                                </div>
                            ))}

                            {/* +More Button */}
                            <div className="aspect-square rounded-lg overflow-hidden border border-[#f2f1f4] dark:border-white/10 relative cursor-pointer group" onClick={() => setIsGalleryOpen(true)}>
                                <div className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: `url("${galleryImages[3]}")` }}></div>
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex items-center justify-center text-white font-bold text-lg">
                                    +{galleryImages.length - 3}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Host Info */}
                    <div className="border-t border-[#f2f1f4] dark:border-white/10 pt-8 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="size-14 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
                                <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZgqoVwWRc6NXW5CmIcWQoMQVY-pex16ch4ehkTYAXsLCUGU5i5VoXzLp2HvUFu8AdOEjLZxlwaWUTgeHfNGAe26cwfc9PYjkuDkTwXUlQqhq8yA1TpXQtL4CHFki8XhFST2xywHejEPAI8BiypMak0XeXHPaxMhbxjnla1bFQOAl_pGuoVgufqvzvFO3ZBwPJzXOf6DCemK4wpBy042mwJcpSskBqoS7SlDQ1X9cNJjB2rJP9CPH6tnpD6mpDB94OhKDeZ0jRsn8" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Hosted by Alexander K.</p>
                                <p className="text-xs text-[#726a81]">Joined in 2025 • Response time: 1 hour</p>
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
                                <span className="text-3xl font-bold tracking-tight">890 DH</span>
                                <span className="text-[#726a81] font-medium">/ day</span>
                            </div>
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-2 gap-0 border border-[#f2f1f4] dark:border-white/10 rounded-xl overflow-hidden">
                                    <div className="p-3 border-r border-[#f2f1f4] dark:border-white/10 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer">
                                        <p className="text-[10px] font-bold uppercase text-[#726a81] tracking-tighter">Pickup</p>
                                        <p className="text-sm font-medium">
                                            {selectedDates.start ? `Oct ${selectedDates.start}, 10:00 AM` : 'Select date'}
                                        </p>
                                    </div>
                                    <div className="p-3 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer">
                                        <p className="text-[10px] font-bold uppercase text-[#726a81] tracking-tighter">Return</p>
                                        <p className="text-sm font-medium">
                                            {selectedDates.end ? `Oct ${selectedDates.end}, 10:00 AM` : 'Select date'}
                                        </p>
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
                                    <span className="text-[#726a81]">
                                        890 DH x {(selectedDates.start && selectedDates.end) ? (selectedDates.end - selectedDates.start) : 0} days
                                    </span>
                                    <span className="font-medium">
                                        {(selectedDates.start && selectedDates.end) ? (890 * (selectedDates.end - selectedDates.start)) : 0} DH
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#726a81]">Trip fee</span>
                                    <span className="font-medium">150 DH</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-accent font-bold">Promotion: EARLYBIRD</span>
                                    <span className="text-accent font-bold">-250 DH</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-dashed border-[#f2f1f4] dark:border-white/10">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-lg">
                                        {Math.max(0, ((selectedDates.start && selectedDates.end) ? (890 * (selectedDates.end - selectedDates.start)) : 0) + 150 - 250)} DH
                                    </span>
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