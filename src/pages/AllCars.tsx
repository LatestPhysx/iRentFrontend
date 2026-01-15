import { useState, useMemo } from 'react'

type Car = {
    id: string
    name: string
    price: number
    type: 'Electric' | 'Luxury' | 'SUV' | 'Sport' | 'Exotic'
    rating: number
    image: string
    tags: string[]
    badge?: string
    available: boolean
}

const CARS: Car[] = [
    {
        id: '1',
        name: 'Tesla Model 3',
        price: 1200,
        type: 'Electric',
        rating: 4.9,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5X6_F-0xqH1GT1yIkZIdCmwWVPYk4GTcx7NiYwxcwouaF8hYPHW8Bd9kZdgJu6u9iHCI1hDV8LVbCo8ZneicaNzJwZXkr2Wm9LNfXfRsCXmcrG-6r880HVjA5snzMHow5FZ9q3dUZQd0uJ9PGdNJRUS1ArWYKsfX-1wopf9bNA2_rqkGDIWpMR0IyRK2Xkxv4ozISsxUDhYkxx2pMyHlHKs6XyI2eYBMB4v__ZOmG6b77PS73opgYfSPiW3j44VReJrPiNcy1BVw',
        tags: ['Electric', 'Autopilot'],
        badge: 'Best Value',
        available: true
    },
    {
        id: '2',
        name: 'Porsche Taycan',
        price: 3500,
        type: 'Sport',
        rating: 5.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfjUn3FsmrxBYakH8WNO3dussZEzDY1ZNBBoohRpP8u0kMwjKvWxWL4E3NvlTMZKAlLqkynDPujggWNsLJ_gmlMU9p0Tn3ZDwPtWCM08nZidk4oHiveoKOo9eyB1JPKMY3hxzEvMfKdDW53a5tsuecEWe_sb3Uo-6Lqqf5sJ-AU-EAdRaapH4uw3WVvNyV9I07wl2QFjBwAlgA-UKL0JJWpqoH0h-tUXeQy0Goz8qALa2rlmDvWKJ0CqRdBpvrdCcou_GoDmZJkcA',
        tags: ['Sport', 'Luxury'],
        available: false
    },
    {
        id: '3',
        name: 'BMW iX xDrive50',
        price: 2100,
        type: 'SUV',
        rating: 4.8,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiL-t4ABu_soPa_ySKwXmI2JVe6UeQjMIRfSJNOoR9Cw1FXVA2WfDn8molBC3OXPJ6JkLd57-h91056EWQQr-qw-WecAPezx2bGc3dpdWmmYSWYtZ1QEyd5dVUkHVgmry6n6hN0y0RLMKChN-ZO1br3RSiLO5vxwIXKfeBM7KgD1GYq5e2MQDYaNCGEbv05sLN0N1j3ErEFPV1msoUVcZdV5NquqDBzMBID-uPMfpcq-zPqL5KeMUOpIR7L7ChKO_sUYN2Zt99UZU',
        tags: ['AWD', 'SUV'],
        badge: 'New Listing',
        available: true
    },
    {
        id: '4',
        name: 'Audi e-tron GT',
        price: 2800,
        type: 'Sport',
        rating: 4.7,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO59bIDAQz02gMmnxtpoGkg96LH-TQ_GTmO9RQm16E1DF2FutfCUHQyEW6FVrADzQJg9hsC0X3Tsnh-t450-pD-4XOIovZmiU2d5MM6pQstfbx6il8eiMOoyTqMHvGId-oUBPh93I3K7gmKcomXkE85NiPA1nym0nGU9D6aSq6ATs3_EzbQiNKtS8blBhuhnMzvVVG_ED1C_NSDjYWpJMPd5GlNvmrEJqjZStAYmIAYiWta7MPe2gpKpY2nX-2GYoni5KgOfWlRuY',
        tags: ['Quattro', 'Performance'],
        available: true
    },
    {
        id: '5',
        name: 'Mercedes EQS 580',
        price: 3100,
        type: 'Luxury',
        rating: 4.9,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT4ySCUTTYrEg-NGH9D9vArXLWiYNItEmosDR3N-XZA2N5Fib--yjMF0kn0GUDYaFnh4rPv8UDZMF8ZjuHzLQ52CkvgaP87PVQ9jZhQ-GoFXDa5PW59e4l8SrENYsvNPVKXL-c3RWdz0l5WrF3_R998AFjPBIbosj3QkOXv1NcpzwwChWGs6XgvsD1kkPM8kM9Gqz7wB3m1ytZ8DMG8ckzxTtF6L8omJxv8F64rmvhI0efi-JS_Ah62bgmv2sRTQoHrCJXdkF30ac',
        tags: ['Ultra Luxury', 'Electric'],
        available: true
    },
    {
        id: '6',
        name: 'Rivian R1T',
        price: 1950,
        type: 'SUV',
        rating: 4.9,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8gc2ZFZmR0wvDhRlSOsQXD22bOdO1V3X9jvRhB40CisNnMy027g5XK7jP7hHf6qBpaubYJm5uyR7VI0uJNU2YTns7QiX-jUQ4V4o2Q_4Wnd_UTw3x6MVO6W_kjRN62UaE3lLeEfBw3l6ewRraWSHnPmUDdt9TeeeJ_f1B4FbR9nNZEaThWn2KjJgVT8HpCWMiq0sMATUk9khOuv5BVpYrqNFFDdsTVAqpkcoS8pSPMZNVoDLzo6SzjEW7LEj-UIhWZ2nE35aFTUg',
        tags: ['Adventure', 'Quad-Motor'],
        available: false
    },
    {
        id: '7',
        name: 'Lucid Air Grand Touring',
        price: 3900,
        type: 'Luxury',
        rating: 5.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDYdJr4n6oltdDiMjH0ZUS1fTOdOls5gOGa37AkRzorR310gcawZTYKuzsed3-dDT0OG-H9YeAEPuOAiZ9bJ8aGvheG9R5jCP7hfaKwFgOxVKdxnSefGfZZ8PeCSRf1tcflYk7l2UYCdNOYnDxxuABPO484KMIqSpcuiPWvM_GmhDpqHekbYkwto6sp2KcMxjfu-_HAAB8uWO2HFR_0VwJdGVVvXUGPmgBwM2shfEyJaMjPJbqKUzahPVHsuiMj7a-52VmU_79haA',
        tags: ['Long Range', 'Premium'],
        available: true
    },
    {
        id: '8',
        name: 'Lambo Huracán EVO',
        price: 8500,
        type: 'Exotic',
        rating: 4.9,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFnKuAQP11rVYqGfwlyCrKf5wQwIjnFVjJ6t1ty5vuLKJusNMdUhSM4rElMzKviCVNKLwLHCm5uBvgzV5omh6-aSFo7A7vVz4xuJfI0AbsjQ80oEa4G0HKF8rmjfFPW336LLmADCY7mLLwcd9s7LvidB7oj2njvWIFdJAYJPH7ZsTkCJA75vbdnzgFfpBCYAMdNtmL4nIz0el23iogZWwBP4RpSnKeXOk1ujxUh0wQuie_-G5x2apqAGmCM60J4EOT1Wnz74C4Ld8',
        tags: ['Exotic', 'V10 Engine'],
        available: true
    }
]

export default function AllCars() {
    const [selectedType, setSelectedType] = useState<string>('All')
    const [priceRange, setPriceRange] = useState<string>('All')
    const [availability, setAvailability] = useState<string>('All')

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
                                    <div
                                        className={`w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 ${car.available ? 'group-hover:scale-105' : 'grayscale'}`}
                                        style={{ backgroundImage: `url('${car.image}')` }}
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
