'use client'

import { useStore } from '@/src/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllValidatedInvitationsClientComponent({ allValidatedInvitations }: { allValidatedInvitations: any }) {

    const selectedItem = useStore((state) => state.navigationState)

    // const [state, setState] = useState(true);

    let state = true;

    const setState = (statePassed: any) => {
        state = statePassed
    }

    return (

        <>
            <div
                key={3}
                id={`tabpanel-${3}`}
                role="tabpanel"
                aria-labelledby={`tab-${3}`}
                hidden={selectedItem !== 3}
                className="mx-auto px-4 md:px-8" style={{ marginTop: "2rem" }}>
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            ALL VALIDATED INVITATIONS
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Search all validated accreditations here.
                        </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <a
                            href="javascript:void(0)"
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Add member
                        </a>
                    </div>
                </div>

                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>ID</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>SURNAME</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>FIRSTNAME</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>PICTURE</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>EMAIL</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>DATE</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>PLACE</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>TITLE</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>TIME</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>PROGRAM TITLE</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>INVITATION STATUS</th>
                                <th className="py-3 px-6" style={{ textAlign: "left" }}>VALIDATION</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                allValidatedInvitations.map((request: any, idx: any) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.userlastname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.userfirstname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><img src={request.userpicture} className="w-10 h-10 rounded-full" style={{ width: "2.5rem", borderRadius: "9999px" }} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.userid}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.eventdate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.eventplace}</td>
                                        <td className="px-6 py-4 whitespace-wrap">{request.eventtitle}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.eventdate}</td>
                                        <td className="px-6 py-4 whitespace-wrap">{request.eventtitle}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{request.invitationstatus}</td>

                                        <td className="text-right px-6 whitespace-nowrap">
                                            <a className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                            // onClick={() => viewInvitations(request)}
                                            >
                                                View
                                            </a>
                                            <a className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Reject
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div>
                    {
                        state ? (
                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div className="fixed inset-0 w-full h-full bg-black opacity-40"
                                    onClick={() => setState(false)}
                                ></div>
                                <div className="flex items-center min-h-screen px-4 py-8">
                                    <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                                        <div className="flex items-center justify-between p-4 border-b">
                                            <h4 className="text-lg font-medium text-gray-800">
                                                Terms and agreements
                                            </h4>
                                            <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                                            // onClick={() => setState(false)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                                            <p>
                                                Commodo eget a et dignissim dignissim morbi vitae, mi. Mi aliquam sit ultrices enim cursus. Leo sapien, pretium duis est eu volutpat interdum eu non. Odio eget nullam elit laoreet. Libero at felis nam at orci venenatis rutrum nunc. Etiam mattis ornare pellentesque iaculis enim.
                                            </p>
                                            <p>
                                                Felis eu non in aliquam egestas placerat. Eget maecenas ornare venenatis lacus nunc, sit arcu. Nam pharetra faucibus eget facilisis pulvinar eu sapien turpis at. Nec aliquam aliquam blandit eu ipsum.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 mt-5 border-t">
                                            <button className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() => setState(true)}
                                            >
                                                Download
                                            </button>
                                            <button className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() => setState(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        </>
    )
}
