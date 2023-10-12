
import AuthenticatedUserDashboardContent from "./AuthenticatedUserDashboardContent";
import AuthenticatedUserDashboardSubNav from "./AuthenticatedUserDashboardSubNav";
import AuthenticatedUserDashboardTitle from "./AuthenticatedUserDashboardTitle";

interface AuthenticatedUserDashboardProps {
    plans: any; // You should replace 'any' with the appropriate type for 'plans'
}

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

const subNavIdx = 0;

export default function AuthenticatedUserDashboard({ plans }: { plans: AuthenticatedUserDashboardProps }) {

    return (
        <>
            <AuthenticatedUserDashboardSubNav />

            <div className="max-w-screen-xl mx-auto px-4 pt-4 md:px-8">
            </div>
            <section className='py-14'>

                <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                    <AuthenticatedUserDashboardTitle />
                    <AuthenticatedUserDashboardContent plans={plans} />
                </div>

            </section>
        </>
    )
}