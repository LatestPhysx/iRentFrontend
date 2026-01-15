import { useState, useMemo, useEffect } from 'react'
import { CARS } from '../data/cars'

export default function AllCars() {
    const [selectedType, setSelectedType] = useState<string>('All')
    const [priceRange, setPriceRange] = useState<string>('All')
    const [availability, setAvailability] = useState<string>('All')

    // Dynamic Page Title
    useEffect(() => {
        document.title = 'iRent | All Cars'
    }, [])

    const filteredCars = useMemo(() => {
        return CARS.filter((car) => {
            // Type Filter
            if (selectedType !== 'All' && car.type !== selectedType) return false

            // Price Filter
            if (priceRange !== 'All') {
                if (priceRange === 'low' && car.price > 2000) return false
                if (priceRange === 'mid' && (car.price <= 2000 || car.price > 4000)) return false
                if (priceRange === 'high' && car.price <= 4000) return false
            }

            // Availability Filter
            if (availability === 'Available' && !car.available) return false

            return true
        })
    }, [selectedType, priceRange, availability])

    const isFilterActive = selectedType !== 'All' || priceRange !== 'All' || availability !== 'All'

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full h-[400px] pt-28">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/cars-hero.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative h-full w-full flex flex-col justify-center px-6">
                    <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center">
                        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-xl font-display mb-4">
                            Cars Available
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl">
                            Economy, comfort, luxury, or sport. Explore cars that fit your needs and your budget
                        </p>
                    </div>
                </div>
            </section>

            <div className="flex-1 mx-auto max-w-7xl w-full px-6 lg:px-10 py-12">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 ml-1">Vehicle Type</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full sm:w-48 pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
                            >
                                <option value="All">All Types</option>
                                <option value="Electric">Electric</option>
                                <option value="SUV">SUV</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Sport">Sport</option>
                                <option value="Exotic">Exotic</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 ml-1">Price / Day</label>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full sm:w-48 pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
                            >
                                <option value="All">Any Price</option>
                                <option value="low">Under 2000 DH</option>
                                <option value="mid">2000 - 4000 DH</option>
                                <option value="high">4000+ DH</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 ml-1">Availability</label>
                            <select
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
                                className="w-full sm:w-48 pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
                            >
                                <option value="All">Any Status</option>
                                <option value="Available">Available Now</option>
                            </select>
                        </div>

                        {/* Clear Filter Button - Always Visible, Disabled when inactive */}
                        <button
                            onClick={() => {
                                setSelectedType('All')
                                setPriceRange('All')
                                setAvailability('All')
                            }}
                            disabled={!isFilterActive}
                            className={`sm:mt-6 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${isFilterActive
                                ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer'
                                : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                            Clear
                        </button>
                    </div>

                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
                        Showing <span className="text-slate-900 dark:text-white">{filteredCars.length}</span> results
                    </div>
                </div>

                {/* Car Grid */}
                {filteredCars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredCars.map((car) => (
                            <div key={car.id} className={`group flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-300 ${car.available ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-80'}`}>
                                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    {/* Status Badge */}
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm ${car.available
                                            ? 'bg-green-500 text-white'
                                            : 'bg-slate-500 text-white'
                                            }`}>
                                            {car.available ? 'Available' : 'Booked'}
                                        </span>
                                    </div>
                                    {car.badge && (
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="bg-brand-olive text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">{car.badge}</span>
                                        </div>
                                    )}
                                    {/* Lazy Loaded Image */}
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        loading="lazy"
                                        className={`w-full h-full object-cover transition-transform duration-500 ${car.available ? 'group-hover:scale-105' : 'grayscale'}`}
                                    />
                                    {!car.available && (
                                        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center">
                                            <span className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">Currently Booked</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display leading-tight">{car.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                            <span className="material-symbols-outlined text-sm text-amber-500 fill-1">star</span> {car.rating.toFixed(1)}
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-primary mb-3">{car.price} DH <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ day</span></p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {car.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-auto">
                                        <button
                                            disabled={!car.available}
                                            className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${car.available
                                                ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
                                                : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed'
                                                }`}
                                        >
                                            {car.available ? 'View Details' : 'Unavailable'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-slate-400">no_crash</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No cars found</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                            We couldn't find any vehicles matching your current filters. Try adjusting your search criteria.
                        </p>
                        <button
                            onClick={() => { setSelectedType('All'); setPriceRange('All'); setAvailability('All') }}
                            className="mt-6 font-bold text-primary hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Pagination / Load More (Only show if we have cars) */}
                {filteredCars.length > 0 && (
                    <div className="mt-20 flex flex-col items-center justify-center gap-4">
                        <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold px-8 py-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-800">
                            Show more vehicles
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Showing {filteredCars.length} available cars</p>
                    </div>
                )}
            </div>
        </div>
    )
}
