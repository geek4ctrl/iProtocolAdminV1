'use client'

import { useStore } from '@/src/store';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from './SupabaseClient';

export default function AllValidatedAccreditationsClientComponent({ allValidatedAccreditations }: { allValidatedAccreditations: any }) {

    // Search section
    const [search, setSearch] = useState('');

    const allValidatedInvitationsAfterFilter = {
        nodes: allValidatedAccreditations.filter((item: any) =>
            item.userfirstname.toLowerCase().includes(search.toLowerCase())
        ),
    };

    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    };

    const selectedItem = useStore((state) => state.navigationState);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [state, setState] = useState({ title: "", firstname: "", surname: "", email: "", diocese: "" });

    const [modalContent, setModalContent] = useState({
        id: 5,
        eventauthor: "Pape Benoit XVI",
        eventdate: "Saturday July 2, 2022",
        invitationstatus: "validated",
        reservationtype: "Invitation",
        userid: "bigey35353@ipniel.com"
    });

    const viewInvitations = async (request: any) => {

        console.log('Show me the selected request: ', request);

        setModalContent(prevState => ({
            ...prevState, title: request.id
        }))

        setModalContent(prevState => ({
            ...prevState, title: request.eventauthor
        }))

        setModalContent(prevState => ({
            ...prevState, title: request.eventdate
        }))

        setModalContent(prevState => ({
            ...prevState, title: request.invitationstatus
        }))

        setModalContent(prevState => ({
            ...prevState, title: request.reservationtype
        }))

        setModalContent(prevState => ({
            ...prevState, title: request.userid
        }))

        try {
            const { data, error } = await supabase
                .from('users')
                .select("*")
                .eq('email', request.userid);

            if (error) {
                throw error;
            }

            console.log('Show me the data: ', data);

            const modalContent = {
                title: data[0].title,
                firstname: data[0].firstname,
                surname: data[0].surname,
                email: data[0].email,
                diocese: data[0].diocese,
            }

            setState(prevState => ({
                ...prevState, title: modalContent.title
            }))

            setState(prevState => ({
                ...prevState, firstname: modalContent.firstname
            }))

            setState(prevState => ({
                ...prevState, surname: modalContent.surname
            }))

            setState(prevState => ({
                ...prevState, email: modalContent.email
            }))

            setState(prevState => ({
                ...prevState, diocese: modalContent.diocese
            }))

            setIsModalOpen(true);
            // successfulNotification();
            // location.reload();

            console.log('Show me the state: ', state);
            console.log('Show me the qr code: ', modalContent);
        } catch (error) {
            // eventReservationUpdateNotification();
        }

    }

    return (

        <>
            <div
                key={4}
                id={`tabpanel-${4}`}
                role="tabpanel"
                aria-labelledby={`tab-${4}`}
                hidden={selectedItem !== 4}
                className="mx-auto px-4 md:px-8" style={{ marginTop: "2rem" }}>
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            ALL VALIDATED ACCREDITATIONS
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Search all validated accreditations here.
                        </p>

                        <div>
                            <label className="font-medium">
                                The search is based on the first name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                onChange={handleSearch}
                            />
                        </div>
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
                                allValidatedInvitationsAfterFilter.nodes.map((request: any, idx: any) => (
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
                                                onClick={() => viewInvitations(request)}
                                            >
                                                View
                                            </a>
                                            <a className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto" style={{ width: "40%", position: "absolute" }}>
                    <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setIsModalOpen(false)}></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                            <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500" style={{ textAlign: "center" }}>
                                <h1>
                                    {state.title}  {state.firstname} {state.surname}
                                </h1>
                                <h1>{state.email}</h1>
                                <h1>{state.diocese}</h1>
                            </div>

                            <div className="" style={{ textAlign: "-webkit-center" }}>
                                <QRCode value={modalContent.userid} />
                            </div>

                            <div className="flex items-center gap-3 p-4 mt-5 border-t" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <button
                                    className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus-ring-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Download
                                </button>
                                <button
                                    className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus-ring-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
