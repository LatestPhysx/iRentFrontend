import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type Suggestion = {
    displayName: string
    lat: string
    lon: string
}

export default function Home() {
    const [pickupLocation, setPickupLocation] = useState('')
    const [dropoffLocation, setDropoffLocation] = useState('')
    const [sameLocation, setSameLocation] = useState(true)
    const [pickupDate, setPickupDate] = useState('')
    const [pickupTime, setPickupTime] = useState('')
    const [dropoffDate, setDropoffDate] = useState('')
    const [dropoffTime, setDropoffTime] = useState('')
    const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([])
    const [dropoffSuggestions, setDropoffSuggestions] = useState<Suggestion[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchSuggestions = async (query: string, setter: (s: Suggestion[]) => void) => {
        if (query.trim().length < 3) {
            setter([])
            return
        }
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=ma`
            const res = await fetch(url, {
                headers: {
                    'Accept-Language': 'en',
                },
            })
            if (!res.ok) throw new Error('Failed to fetch suggestions')
            const data = await res.json()
            const mapped: Suggestion[] = data.slice(0, 5).map((item: any) => ({
                displayName: item.display_name,
                lat: item.lat,
                lon: item.lon,
            }))
            setter(mapped)
        } catch (err) {
            setter([])
        }
    }

    const pickupDateTime = useMemo(() => {
        if (!pickupDate || !pickupTime) return null
        return new Date(`${pickupDate}T${pickupTime}`)
    }, [pickupDate, pickupTime])

    const dropoffDateTime = useMemo(() => {
        if (!dropoffDate || !dropoffTime) return null
        return new Date(`${dropoffDate}T${dropoffTime}`)
    }, [dropoffDate, dropoffTime])

    const isDropoffAfterPickup =
        pickupDateTime && dropoffDateTime ? dropoffDateTime.getTime() > pickupDateTime.getTime() : true

    const canSearch =
        pickupLocation.trim().length > 0 &&
        pickupDateTime !== null &&
        dropoffDateTime !== null &&
        isDropoffAfterPickup

    useEffect(() => {
        if (!isDropoffAfterPickup) {
            setError('Drop-off must be after pickup.')
        } else {
            setError(null)
        }
    }, [isDropoffAfterPickup])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!canSearch) return
        alert('Search initiated!')
    }

    const handleClear = () => {
        setPickupLocation('')
        setDropoffLocation('')
        setSameLocation(true)
        setPickupDate('')
        setPickupTime('')
        setDropoffDate('')
        setDropoffTime('')
        setError(null)
    }

    // Dynamic Page Title
    useEffect(() => {
        document.title = 'iRent | Home'
    }, [])

    return (
        <>
            <section className="relative w-full h-auto min-h-[500px] lg:h-[680px] pt-28 pb-12 lg:pb-0">
                <div
                    className="absolute inset-0 bg-cover bg-center lg:bg-[center_right]"
                    style={{
                        // Place your image at public/hero-car.jpg so this works in dev and on GitHub Pages
                        backgroundImage: "url('/hero-car.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/40 to-black/20" />
                </div>

                <div className="relative h-full w-full flex flex-col md:pb-0">
                    <div className="flex-1 flex flex-col justify-center px-6">
                        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-center">
                            <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl max-w-4xl leading-tight font-display">
                                Rent a Car in Minutes. <span className="text-primary inline-block font-arabic tracking-wide whitespace-nowrap hover:scale-105 transition-transform duration-300 cursor-default">بلا صداع</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-white/95 max-w-2xl font-medium">
                                Pick a location, choose your dates, and hit the road simple, fast, and transparent.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search bar: Static on mobile/tablet, Absolute overlap ONLY on Desktop (lg+) */}
                <div className="relative lg:absolute inset-x-0 bottom-0 lg:translate-y-1/2 flex justify-center px-6 z-20 mt-8 lg:mt-0">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-6xl bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800"
                    >
                        {/* Desktop Layout (>= 1024px) */}
                        <div className="hidden lg:grid grid-cols-12 gap-4">
                            <div className="col-span-12 lg:col-span-4 space-y-2">
                                <label
                                    htmlFor="pickup-location-desktop"
                                    className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1"
                                >
                                    Pickup Location
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                        <span className="material-symbols-outlined text-xl">location_on</span>
                                    </div>
                                    <input
                                        id="pickup-location-desktop"
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium"
                                        placeholder="City, airport, or address"
                                        type="text"
                                        value={pickupLocation}
                                        onChange={(e) => {
                                            setPickupLocation(e.target.value)
                                            fetchSuggestions(e.target.value, setPickupSuggestions)
                                            if (sameLocation) setDropoffLocation(e.target.value)
                                        }}
                                        autoComplete="off"
                                        required
                                    />
                                    {pickupSuggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-10 overflow-hidden">
                                            {pickupSuggestions.map((s) => (
                                                <button
                                                    type="button"
                                                    key={`desktop-${s.lat}-${s.lon}`}
                                                    className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex flex-col gap-1"
                                                    onClick={() => {
                                                        setPickupLocation(s.displayName)
                                                        if (sameLocation) setDropoffLocation(s.displayName)
                                                        setPickupSuggestions([])
                                                    }}
                                                >
                                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                                        {s.displayName}
                                                    </span>
                                                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                                        {Number(s.lat).toFixed(4)}, {Number(s.lon).toFixed(4)}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-2 ml-1">
                                    <input
                                        checked={sameLocation}
                                        onChange={(e) => {
                                            const checked = e.target.checked
                                            setSameLocation(checked)
                                            if (checked) setDropoffLocation(pickupLocation)
                                        }}
                                        className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300"
                                        id="same-location-desktop"
                                        type="checkbox"
                                    />
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400" htmlFor="same-location-desktop">
                                        Return car to same location
                                    </label>
                                    <span className="text-slate-300 dark:text-slate-600">•</span>
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="text-sm font-bold text-primary hover:underline transition-colors"
                                    >
                                        Clear all
                                    </button>
                                </div>
                                {!sameLocation && (
                                    <div className="space-y-2 mt-2">
                                        <label
                                            htmlFor="dropoff-location-desktop"
                                            className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1"
                                        >
                                            Drop-off Location
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                                <span className="material-symbols-outlined text-xl">location_on</span>
                                            </div>
                                            <input
                                                id="dropoff-location-desktop"
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium"
                                                placeholder="City, airport, or address"
                                                type="text"
                                                value={dropoffLocation}
                                                onChange={(e) => {
                                                    setDropoffLocation(e.target.value)
                                                    fetchSuggestions(e.target.value, setDropoffSuggestions)
                                                }}
                                                autoComplete="off"
                                                required
                                            />
                                            {dropoffSuggestions.length > 0 && (
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-10 overflow-hidden">
                                                    {dropoffSuggestions.map((s) => (
                                                        <button
                                                            type="button"
                                                            key={`desktop-dropoff-${s.lat}-${s.lon}`}
                                                            className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex flex-col gap-1"
                                                            onClick={() => {
                                                                setDropoffLocation(s.displayName)
                                                                setDropoffSuggestions([])
                                                            }}
                                                        >
                                                            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                                                {s.displayName}
                                                            </span>
                                                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                                                {Number(s.lat).toFixed(4)}, {Number(s.lon).toFixed(4)}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col-span-6 lg:col-span-3 space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                    Pickup Date &amp; Time
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 text-sm font-medium"
                                            type="date"
                                            value={pickupDate}
                                            onChange={(e) => setPickupDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="relative w-28">
                                        <input
                                            className="w-full px-2 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 text-sm font-medium"
                                            type="time"
                                            value={pickupTime}
                                            onChange={(e) => setPickupTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-6 lg:col-span-3 space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                    Drop-off Date &amp; Time
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 text-sm font-medium"
                                            type="date"
                                            value={dropoffDate}
                                            onChange={(e) => setDropoffDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="relative w-28">
                                        <input
                                            className="w-full px-2 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 text-sm font-medium"
                                            type="time"
                                            value={dropoffTime}
                                            onChange={(e) => setDropoffTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 lg:col-span-2 flex items-center justify-end pr-4">
                                <button
                                    type="submit"
                                    className={`w-32 px-5 py-3 rounded-xl font-bold transition-all ${canSearch
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90'
                                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                        }`}
                                    disabled={!canSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Mobile (< 1024px) Layout: Stacked for Mobile, Compact Grid for Tablet */}
                        <div className="lg:hidden flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-4 text-left">
                            {/* 1. Pickup Location Card */}
                            <div className="space-y-2 md:col-span-2">
                                <label
                                    htmlFor="pickup-location-mobile"
                                    className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1"
                                >
                                    Pickup Location
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                        <span className="material-symbols-outlined text-xl">location_on</span>
                                    </div>
                                    <input
                                        id="pickup-location-mobile"
                                        className="w-full pl-12 pr-4 py-4 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base md:text-sm font-medium"
                                        placeholder="City, airport, or address"
                                        type="text"
                                        value={pickupLocation}
                                        onChange={(e) => {
                                            setPickupLocation(e.target.value)
                                            fetchSuggestions(e.target.value, setPickupSuggestions)
                                            if (sameLocation) setDropoffLocation(e.target.value)
                                        }}
                                        autoComplete="off"
                                        required
                                    />
                                    {pickupSuggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-10 overflow-hidden">
                                            {pickupSuggestions.map((s) => (
                                                <button
                                                    type="button"
                                                    key={`mobile-${s.lat}-${s.lon}`}
                                                    className="w-full text-left p-4 md:p-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex flex-col gap-1 border-b border-slate-100 dark:border-slate-800 last:border-0"
                                                    onClick={() => {
                                                        setPickupLocation(s.displayName)
                                                        if (sameLocation) setDropoffLocation(s.displayName)
                                                        setPickupSuggestions([])
                                                    }}
                                                >
                                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                                        {s.displayName}
                                                    </span>
                                                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                                        {Number(s.lat).toFixed(4)}, {Number(s.lon).toFixed(4)}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 2. Pickup Date & Time Grid */}
                            <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        Pickup Date
                                    </label>
                                    <input
                                        className="w-full px-4 py-4 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 text-sm font-medium"
                                        type="date"
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        Time
                                    </label>
                                    <input
                                        className="w-full px-4 py-4 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 text-sm font-medium"
                                        type="time"
                                        value={pickupTime}
                                        onChange={(e) => setPickupTime(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* 3. Toggle */}
                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 md:p-3 rounded-xl border border-slate-200 dark:border-slate-700 md:col-span-2">
                                <div className="relative flex items-center">
                                    <input
                                        checked={sameLocation}
                                        onChange={(e) => {
                                            const checked = e.target.checked
                                            setSameLocation(checked)
                                            if (checked) setDropoffLocation(pickupLocation)
                                        }}
                                        className="w-5 h-5 rounded text-primary focus:ring-primary border-slate-300"
                                        id="same-location-mobile"
                                        type="checkbox"
                                    />
                                </div>
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex-1 cursor-pointer" htmlFor="same-location-mobile">
                                    Return car to same location
                                </label>
                            </div>

                            {/* 4. Dropoff Location (Conditional) */}
                            {!sameLocation && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-200 md:col-span-2">
                                    <label
                                        htmlFor="dropoff-location-mobile"
                                        className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1"
                                    >
                                        Drop-off Location
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                            <span className="material-symbols-outlined text-xl">location_on</span>
                                        </div>
                                        <input
                                            id="dropoff-location-mobile"
                                            className="w-full pl-12 pr-4 py-4 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base md:text-sm font-medium"
                                            placeholder="City, airport, or address"
                                            type="text"
                                            value={dropoffLocation}
                                            onChange={(e) => {
                                                setDropoffLocation(e.target.value)
                                                fetchSuggestions(e.target.value, setDropoffSuggestions)
                                            }}
                                            autoComplete="off"
                                            required
                                        />
                                        {dropoffSuggestions.length > 0 && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-10 overflow-hidden">
                                                {dropoffSuggestions.map((s) => (
                                                    <button
                                                        type="button"
                                                        key={`mobile-dropoff-${s.lat}-${s.lon}`}
                                                        className="w-full text-left p-4 md:p-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex flex-col gap-1 border-b border-slate-100 dark:border-slate-800 last:border-0"
                                                        onClick={() => {
                                                            setDropoffLocation(s.displayName)
                                                            setDropoffSuggestions([])
                                                        }}
                                                    >
                                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                                            {s.displayName}
                                                        </span>
                                                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                                            {Number(s.lat).toFixed(4)}, {Number(s.lon).toFixed(4)}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* 5. Dropoff Date & Time Grid */}
                            <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        Drop-off Date
                                    </label>
                                    <input
                                        className="w-full px-4 py-4 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 text-sm font-medium"
                                        type="date"
                                        value={dropoffDate}
                                        onChange={(e) => setDropoffDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                                        Time
                                    </label>
                                    <input
                                        className="w-full px-4 py-4 md:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 dark:text-slate-100 text-sm font-medium"
                                        type="time"
                                        value={dropoffTime}
                                        onChange={(e) => setDropoffTime(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 flex flex-col gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    className={`w-full py-4 md:py-3 rounded-xl font-bold text-lg md:text-base shadow-xl shadow-primary/20 transition-all ${canSearch
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                        }`}
                                    disabled={!canSearch}
                                >
                                    Search Cars
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="w-full py-3 md:py-2 font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors md:text-sm"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                        {error && (
                            <p className="text-sm text-red-600 font-semibold mt-3 text-left">{error}</p>
                        )}
                    </form>
                </div>
            </section>

            {/* Adjusted padding top for categories since absolute search bar only overlaps on desktop now */}
            {/* If static on mobile/tablet, we don't need huge padding top. If absolute on desktop, we do. */}
            <section className="max-w-7xl mx-auto px-6 pt-12 lg:pt-40 pb-20">
                <h3 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-10 text-left font-display">
                    Categories
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="group flex flex-col items-center p-8 bg-primary border border-primary rounded-2xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                        <div className="mb-4 text-white/80 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-4xl">auto_awesome</span>
                        </div>
                        <span className="font-bold text-white group-hover:text-white transition-colors">SUVs</span>
                    </div>

                    <div className="group flex flex-col items-center p-8 bg-primary border border-primary rounded-2xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                        <div className="mb-4 text-white/80 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-4xl">electric_car</span>
                        </div>
                        <span className="font-bold text-white group-hover:text-white transition-colors">Electric</span>
                    </div>

                    <div className="group flex flex-col items-center p-8 bg-primary border border-primary rounded-2xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                        <div className="mb-4 text-white/80 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-4xl">workspace_premium</span>
                        </div>
                        <span className="font-bold text-white group-hover:text-white transition-colors">Luxury</span>
                    </div>

                    <div className="group flex flex-col items-center p-8 bg-primary border border-primary rounded-2xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
                        <div className="mb-4 text-white/80 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-4xl">eco</span>
                        </div>
                        <span className="font-bold text-white group-hover:text-white transition-colors">Economy</span>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12 mb-20">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white font-display">
                        Trending Vehicles
                    </h3>
                    <Link
                        className="text-sm font-bold text-primary hover:underline underline-offset-4"
                        to="/cars"
                    >
                        Browse All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWsiPr30HMOPsL20Zbw50dphbkmgV4tLVi4q17QXBaP_5m8OgzR4DxfnjRzQErs7H6YZY2r6PeZ4YBaOYwmL_qnVR6N1yUsm3FLb-DwGHhQkB-5NeQ_krd1jLO8JSrHgNGQymPZn0fOA9C5veaOG5S1AUF6mHYMSyvfQg7nlZY7WuZ2yc5PaO14iK9sUCT7nqum-nnYWSyh_o31bnyJyqRCCjtz0RVUehbC5OuendIeExNeE_jxno6bOcCBMelVNQIPKex579CMaU"
                                alt="Tesla Model 3"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                Electric
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Tesla Model 3</h4>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <span className="material-symbols-outlined !text-sm fill-1">star</span>
                                        <span className="text-xs font-bold text-slate-500">
                                            4.9 (128 reviews)
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xl font-bold text-primary">890 DH</span>
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                                        per day
                                    </span>
                                </div>
                            </div>
                            <Link
                                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors"
                                to="/cars"
                            >
                                View details
                                <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNLfayAnhuev7lVUPEDXTJhUq8DHOY0vQwjeA9VnUqAzZBAZLzrospexDyllvK6V1XgM3DlCTtOUxXepy0-idDmp8Lt3ynzw2mXvcpVeftw6pWyMrcqadj_ZqtAmv9FuDU_P7fHrTX0BX-KSyp8F_d95zbrrCwXr5aYxQAWKNDzcJn96ewjhbLjzeG6-B0Ca0iA9JSRfXdbmRq-ffDli9M12ZoFT6GSM7ssmpfMfeaJKfy4QlTbQFbsqgteqakHpz0QhiU1DuoJ7s"
                                alt="BMW M4 Competition"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                Luxury
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-lg mb-1">BMW M4 Competition</h4>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <span className="material-symbols-outlined !text-sm fill-1">star</span>
                                        <span className="text-xs font-bold text-slate-500">
                                            5.0 (42 reviews)
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xl font-bold text-primary">1550 DH</span>
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                                        per day
                                    </span>
                                </div>
                            </div>
                            <Link
                                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors"
                                to="/cars"
                            >
                                View details
                                <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjeADxneWW9aVwoBpIwodIIt6fChxTyfh8Za19HhvgN5T99Nu4N4oYNIw2jaqv74ATBMUREO2bbOGzXCM8mY0VB7acxddwUGNlSRkeLvbP-kLJepQMfrQk2hrE1zIZQoo2Q8LU1DAIy7T04azmZkwg3N4UfNgLJtxrQ5Qdp81WokOC8ydUBO06UXpLCPTHVPaPYCyr5UHqj1O96VoxdEQdcAjOW9Y33YFGp2lHXUJ0bfhnoqycruygsUTe7eLUkXLqTAE7BxL5KqI"
                                alt="Land Rover Defender"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                SUV
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Land Rover Defender</h4>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <span className="material-symbols-outlined !text-sm fill-1">star</span>
                                        <span className="text-xs font-bold text-slate-500">
                                            4.8 (95 reviews)
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xl font-bold text-primary">1200 DH</span>
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                                        per day
                                    </span>
                                </div>
                            </div>
                            <Link
                                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors"
                                to="/cars"
                            >
                                View details
                                <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATYPMd-Adppp8vXWJeeOCaIUw9sdkf1nYeUnjIGmZ5-fmAlMrXTjSntYgw37idHE17UbXbNgK2rnemqqxX_MM2myBm3hVhgbcYhTD-iGwaaaaivfyUdUmZhAdZ_4ELjWe4ELHRBKLWkgLEgAmhNiXnkLMxcVEK3M3VxKTocNKuTVrqKnWD2w-HX91g3JR406EikUzeoFlj8F8You-MPELcN0ZnwqOR06E3MZTWxmI4fx4qSvf6oqWUSom3-PSg1W5DhSwsZgDAltM"
                                alt="Audi A6 Sedan"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                Economy
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Audi A6 Sedan</h4>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <span className="material-symbols-outlined !text-sm fill-1">star</span>
                                        <span className="text-xs font-bold text-slate-500">
                                            4.7 (215 reviews)
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xl font-bold text-primary">720 DH</span>
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                                        per day
                                    </span>
                                </div>
                            </div>
                            <Link
                                className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors"
                                to="/cars"
                            >
                                View details
                                <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
