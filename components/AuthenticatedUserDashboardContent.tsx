import Link from "next/link";



export default function AuthenticatedUserDashboardContent({ plans }: { plans: any }) {
    return (
        <div className='mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-2'>
            {
                plans.map((item: any, idx: any) => (
                    <div key={idx} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2' style={{ backgroundImage: `url(${item.image})` }}>
                        <div>
                            <span className='text-indigo-600 font-medium'>
                                {item.name}
                            </span>
                        </div>
                        <ul className='py-8 space-y-3'>
                        </ul>
                        <div className="flex-1 flex items-end">
                            <Link href="/events" className="w-full">
                                <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700' style={{ cursor: "pointer" }}>
                                    Choose
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}