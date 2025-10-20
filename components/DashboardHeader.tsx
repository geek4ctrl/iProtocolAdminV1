'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

interface DashboardHeaderProps {
    userEmail?: string | null
    totalRequests: number
    totalEvents: number
}

export default function DashboardHeader({ userEmail, totalRequests, totalEvents }: DashboardHeaderProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="w-full bg-black dark:bg-gray-800 text-white py-4 md:py-6 px-4 md:px-8 border-b-2 border-white dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto">
                {/* Mobile: Stack vertically, Desktop: Side by side */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">IProtocol CENCO V1 Dashboard</h1>
                        <p className="mt-2 text-sm md:text-base text-gray-300 truncate">Welcome, {userEmail || 'Guest'}</p>
                        <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs sm:text-sm">
                            <span className="font-semibold">Total Requests: <span className="text-white">{totalRequests}</span></span>
                            <span className="font-semibold">Total Events: <span className="text-white">{totalEvents}</span></span>
                        </div>
                    </div>
                    {/* Theme Toggle Button - Only render on client side */}
                    <div className="flex items-center justify-end md:justify-start">
                        {mounted && <ThemeToggle />}
                    </div>
                </div>
            </div>
        </div>
    )
}
