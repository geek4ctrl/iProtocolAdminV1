"use client"

import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const subNavigation = [
    {
        href: "javascript:void(0)",
        name: "Dashboard"
    },
    {
        href: "javascript:void(0)",
        name: "Events"
    },
    {
        href: "javascript:void(0)",
        name: "Reservations"
    }
]

const subNavIdx = 1;

export default function AuthenticatedUserEventsSubNav() {
    const router = useRouter()

    const displayMessageForBackButton = () => toast("Please select back button");
    const routeToReservations = () => toast("Routing to reservations soon");

    const routeToDashboardPage = () => {
        router.push('/reservations', { scroll: false })
    }

    const routeToReservationsPage = () => {
        router.push('/reservations', { scroll: false })
    }

    return (
        <div className="mt-6" style={{ marginBottom: "2rem" }}>
            <ul className="w-full border-b flex items-center gap-x-3 overflow-x-auto">
                <li key={subNavIdx} className={`py-2 border-b-2 ${"border-white text-gray-500"}`} onClick={displayMessageForBackButton}>
                    <a
                        href={subNavigation[0].href}
                        className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                    >
                        {subNavigation[0].name}
                    </a>
                </li>
                <li key={subNavIdx} className={`py-2 border-b-2 ${"border-indigo-600 text-indigo-600"}`}>
                    <a
                        href={subNavigation[1].href}
                        className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                    >
                        {subNavigation[1].name}
                    </a>
                </li>
                <li key={subNavIdx} className={`py-2 border-b-2 ${"border-white text-gray-500"}`} onClick={routeToReservationsPage}>
                    <a
                        href={subNavigation[2].href}
                        className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                    >
                        {subNavigation[2].name}
                    </a>
                </li>
            </ul>
        </div>
    )
}
