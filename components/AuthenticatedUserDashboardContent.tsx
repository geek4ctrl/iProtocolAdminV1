'use client'

import { useStore } from "@/src/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


interface Plan {
    name: string;
    image: string;
    // Add more properties as needed
}

export default function AuthenticatedUserDashboardContent({ plans }: { plans: any }) {
    const router = useRouter()


    function callAllFunctions(reservationType: any) {

        notify(reservationType);
        chooseReservationType(reservationType);

        setTimeout(() => {
            routeToEventPage()
        }, 3000)

    }

    function chooseReservationType(reservationType: any) {
        useStore.setState((state) => ({
            chosenReservationType: reservationType
        }))
    }

    const notify = ((reservationType: any) => toast(`You have chosen ${reservationType}`));

    const routeToEventPage = () => {
        router.push('/events', { scroll: false })
    }

    return (
        <div className='mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-2' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <ToastContainer />
            {
                plans.map((item: any, idx: any) => (
                    <div key={idx} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2' style={{ backgroundImage: `url(${item.image})`, width: "10rem", padding: "2rem", textAlign: "center", borderRadius: "15px", marginTop: "5rem" }}>
                        <div>
                            <span className='text-indigo-600 font-medium'>
                                {item.name}
                            </span>
                        </div>
                        <ul className='py-8 space-y-3'>
                        </ul>
                        <div className="flex-1 flex items-end" >
                            <div className="w-full" >
                                <button onClick={() => callAllFunctions(item.name)} className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700' style={{ cursor: "pointer" }} >
                                    Choose
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}