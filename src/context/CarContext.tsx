import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Car } from '../data/cars';
export type { Car };


import { CARS } from '../data/cars';


export type Booking = {
    id: string;
    carId: string;
    carName: string;
    renterName: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: 'Pending' | 'Confirmed' | 'Rejected' | 'Completed';
    image: string;
}

interface CarContextType {
    cars: Car[];
    bookings: Booking[];
    addCar: (car: Omit<Car, 'id'>) => void;
    updateCar: (car: Car) => void;
    deleteCar: (id: string) => void;
    addBooking: (booking: Omit<Booking, 'id'>) => void;
    updateBookingStatus: (id: string, status: Booking['status']) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cars, setCars] = useState<Car[]>(() => {
        const stored = localStorage.getItem('irent_cars');
        return stored ? JSON.parse(stored) : CARS;
    });

    const [bookings, setBookings] = useState<Booking[]>(() => {
        const stored = localStorage.getItem('irent_bookings');
        if (stored) return JSON.parse(stored);

        // Initial mock bookings
        return [
            {
                id: 'b1',
                carId: '1',
                carName: 'Tesla Model 3',
                renterName: 'Alice Johnson',
                startDate: '2024-05-15',
                endDate: '2024-05-18',
                totalPrice: 3600,
                status: 'Confirmed',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5X6_F-0xqH1GT1yIkZIdCmwWVPYk4GTcx7NiYwxcwouaF8hYPHW8Bd9kZdgJu6u9iHCI1hDV8LVbCo8ZneicaNzJwZXkr2Wm9LNfXfRsCXmcrG-6r880HVjA5snzMHow5FZ9q3dUZQd0uJ9PGdNJRUS1ArWYKsfX-1wopf9bNA2_rqkGDIWpMR0IyRK2Xkxv4ozISsxUDhYkxx2pMyHlHKs6XyI2eYBMB4v__ZOmG6b77PS73opgYfSPiW3j44VReJrPiNcy1BVw'
            },
            {
                id: 'b2',
                carId: '3',
                carName: 'BMW iX xDrive50',
                renterName: 'Bob Smith',
                startDate: '2024-05-20',
                endDate: '2024-05-22',
                totalPrice: 4200,
                status: 'Pending',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiL-t4ABu_soPa_ySKwXmI2JVe6UeQjMIRfSJNOoR9Cw1FXVA2WfDn8molBC3OXPJ6JkLd57-h91056EWQQr-qw-WecAPezx2bGc3dpdWmmYSWYtZ1QEyd5dVUkHVgmry6n6hN0y0RLMKChN-ZO1br3RSiLO5vxwIXKfeBM7KgD1GYq5e2MQDYaNCGEbv05sLN0N1j3ErEFPV1msoUVcZdV5NquqDBzMBID-uPMfpcq-zPqL5KeMUOpIR7L7ChKO_sUYN2Zt99UZU'
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('irent_cars', JSON.stringify(cars));
    }, [cars]);

    useEffect(() => {
        localStorage.setItem('irent_bookings', JSON.stringify(bookings));
    }, [bookings]);

    const addCar = (newCarData: Omit<Car, 'id'>) => {
        const newCar: Car = {
            ...newCarData,
            id: Math.random().toString(36).substr(2, 9),
            rating: 5.0, // Default for new cars
            available: true
        };
        setCars(prev => [...prev, newCar]);
    };

    const updateCar = (updatedCar: Car) => {
        setCars(prev => prev.map(c => c.id === updatedCar.id ? updatedCar : c));
    };

    const deleteCar = (id: string) => {
        setCars(prev => prev.filter(c => c.id !== id));
    };

    const addBooking = (newBookingData: Omit<Booking, 'id'>) => {
        const newBooking: Booking = {
            ...newBookingData,
            id: 'b' + Math.random().toString(36).substr(2, 9)
        };
        setBookings(prev => [...prev, newBooking]);
    };

    const updateBookingStatus = (id: string, status: Booking['status']) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    };

    return (
        <CarContext.Provider value={{ cars, bookings, addCar, updateCar, deleteCar, addBooking, updateBookingStatus }}>
            {children}
        </CarContext.Provider>
    );
};

export const useCars = () => {
    const context = useContext(CarContext);
    if (!context) {
        throw new Error('useCars must be used within a CarProvider');
    }
    return context;
};
