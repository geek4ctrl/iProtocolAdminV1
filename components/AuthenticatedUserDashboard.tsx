
import AuthenticatedUserDashboardContent from "./AuthenticatedUserDashboardContent";
import AuthenticatedUserDashboardTitle from "./AuthenticatedUserDashboardTitle";

interface AuthenticatedUserDashboardProps {
    plans: any; // You should replace 'any' with the appropriate type for 'plans'
}

export default function AuthenticatedUserDashboard({ plans }: { plans: AuthenticatedUserDashboardProps }) {
    return (
        <section className='py-14'>

            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <AuthenticatedUserDashboardTitle />
                <AuthenticatedUserDashboardContent plans={plans} />
            </div>

        </section>
    )
}