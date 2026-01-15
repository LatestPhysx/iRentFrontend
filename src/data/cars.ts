export type Car = {
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

export const CARS: Car[] = [
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
