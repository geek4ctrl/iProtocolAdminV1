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
        <div className="w-full bg-black dark:bg-gray-800 text-white py-6 px-4 md:px-8 border-b-2 border-white dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">IProtocol CENCO V1 Dashboard</h1>
                    <p className="mt-2 text-gray-300">Welcome, {userEmail || 'Guest'}</p>
                    <div className="mt-3 flex gap-6 text-sm">
                        <span className="font-semibold">Total Requests: <span className="text-white">{totalRequests}</span></span>
                        <span className="font-semibold">Total Events: <span className="text-white">{totalEvents}</span></span>
                    </div>
                </div>
                {/* Theme Toggle Button - Only render on client side */}
                <div className="flex items-center">
                    {mounted && <ThemeToggle />}
                </div>
            </div>
        </div>
    )
}
