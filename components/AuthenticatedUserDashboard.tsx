
import AuthenticatedUserDashboardContent from "./AuthenticatedUserDashboardContent";
import AuthenticatedUserDashboardTitle from "./AuthenticatedUserDashboardTitle";


export default function AuthenticatedUserDashboard({ plans }: { plans: any }) {
    return (
        <section className='py-14'>

            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <AuthenticatedUserDashboardTitle />
                <AuthenticatedUserDashboardContent plans={plans} />
            </div>

        </section>
    )
}