'use client'

import { useStore } from '@/src/store';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from './SupabaseClient';
import html2canvas from 'html2canvas';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

export default function AllValidationsClientComponent({ allValidations }: { allValidations: any }) {

    // Search section
    const [search, setSearch] = useState('');

    // Ensure allValidations is always an array
    const safeValidations = allValidations || [];

    const allValidationsAfterFilter = {
        nodes: safeValidations.filter((item: any) =>
            item.userfirstname.toLowerCase().includes(search.toLowerCase())
        ),
    };

    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    };

    // Pagination section
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage] = useState(5);

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

    const currentRecords = allValidationsAfterFilter.nodes.slice(indexOfFirstRecord, indexOfLastRecord);

    const nPages = Math.ceil(allValidationsAfterFilter.nodes.length / recordPerPage);

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const goToNextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }

    const goToPrevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    //

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

    // Download image

    const downloadImage = () => {
        const modalElement: any = document.getElementById("modal");

        html2canvas(modalElement).then(function (canvas) {

            // const downloadButton = document.getElementById("download");

            const link = document.createElement('a');
            link.download = 'modal.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    const styles = {
        border: '30px solid rgba(0, 0, 0, 0.05)',
    };

    return (

        <>
            <div
                key={5}
                id={`tabpanel-${5}`}
                role="tabpanel"
                aria-labelledby={`tab-${5}`}
                hidden={selectedItem !== 5}
                className="mx-auto px-4 md:px-8" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-black dark:text-gray-100 text-xl font-bold sm:text-2xl">
                            ALL VALIDATIONS
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Search all validations here.
                        </p>

                        <div>
                            <label className="font-medium text-gray-700 dark:text-gray-300">
                                The search is based on the first name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-black dark:text-white bg-white dark:bg-gray-800 outline-none border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white shadow-sm rounded-lg"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <a
                            href="javascript:void(0)"
                            className="inline-block px-4 py-2 text-white dark:text-black duration-150 font-medium bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-gray-900 dark:active:bg-gray-300 md:text-sm"
                        >
                            Add member
                        </a>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingSpinner size="large" text="Loading validations..." />
                ) : currentRecords.length === 0 ? (
                    <EmptyState 
                        title="No validations found"
                        description="There are currently no validations to display."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        }
                    />
                ) : (
                    <>
                        <div className="mt-12 shadow-sm border border-gray-300 dark:border-gray-700 rounded-lg overflow-x-auto">
                            <table className="w-full table-auto text-sm text-left">
                                <thead className="bg-black dark:bg-gray-800 text-white font-medium border-b border-gray-300 dark:border-gray-700">
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
                                <tbody className="text-black dark:text-gray-200 divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                                    {
                                        currentRecords.map((request: any, idx: any) => (
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
                                                    <a className="py-2 px-3 font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 duration-150 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-black dark:border-white"
                                                        onClick={() => viewInvitations(request)} style={{ cursor: "pointer" }}
                                                    >
                                                        View
                                                    </a>
                                                    <a className="py-2 leading-none px-3 font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 duration-150 rounded-lg ml-2" style={{ cursor: "pointer" }}>
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-black dark:text-white md:px-8">
                            <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
                                <a href="javascript:void(0)" className="hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-x-2" onClick={goToPrevPage}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <ul className="flex items-center gap-1">
                                    {
                                        pageNumbers.map((pgNumber, idx) => (
                                            <li key={pgNumber}
                                                className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                                                <a aria-current={currentPage == pgNumber ? "page" : false} className={`page-link px-3 py-2 rounded-lg duration-150 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 ${currentPage == pgNumber ? "bg-black dark:bg-white text-white dark:text-black font-medium" : ""}`} onClick={() => setCurrentPage(pgNumber)} href='#'>

                                                    {pgNumber}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <a href="javascript:void(0)" className="hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 font-medium sm:hidden">
                                <a href="javascript:void(0)" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg duration-150 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={goToPrevPage}>Previous</a>
                                <div className="font-medium">
                                    {/* Page {currentPage} of {pages.length} */}
                                </div>
                                <a href="javascript:void(0)" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg duration-150 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={goToNextPage}>Next</a>
                            </div>
                        </div>
                    </>
                )}

            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto" style={{ width: "40%", position: "absolute" }}>
                    <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setIsModalOpen(false)}></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-md shadow-lg">
                            <div id="modal" style={styles}>
                                <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-black dark:text-white" style={{ textAlign: "center" }}>
                                    <h1 className="font-bold text-lg">
                                        {state.title}  {state.firstname} {state.surname}
                                    </h1>
                                    <h1>{state.email}</h1>
                                    <h1>{state.diocese}</h1>
                                </div>

                                <div className="flex justify-center" style={{ paddingBottom: "3rem" }}>
                                    <QRCode value={modalContent.userid} />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 mt-5 border-t border-gray-300 dark:border-gray-700" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <button
                                    className="px-6 py-2 text-white dark:text-black bg-black dark:bg-white rounded-md outline-none ring-offset-2 ring-black dark:ring-white focus:ring-2 hover:bg-gray-800 dark:hover:bg-gray-200" id="download"
                                    style={{ padding: "1rem" }}
                                    onClick={() => downloadImage()}
                                >
                                    Download
                                </button>
                                <button
                                    className="px-6 py-2 text-black dark:text-white border border-black dark:border-white rounded-md outline-none ring-offset-2 ring-black dark:ring-white focus:ring-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    style={{ padding: "1rem" }}
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
