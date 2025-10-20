'use client'

import { useStore } from '@/src/store';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from './SupabaseClient';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

export default function AllAccreditationsClientComponent({ allAccreditations }: { allAccreditations: any }) {

    // Search section
    const [search, setSearch] = useState('');

    // Ensure allAccreditations is always an array
    const safeAccreditations = allAccreditations || [];

    const allAccreditationsAfterFilter = {
        nodes: safeAccreditations.filter((item: any) =>
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

    const currentRecords = allAccreditationsAfterFilter.nodes.slice(indexOfFirstRecord, indexOfLastRecord);

    const nPages = Math.ceil(allAccreditationsAfterFilter.nodes.length / recordPerPage);

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

    const approveRequest = async (request: any) => {
        try {
            const { data, error } = await supabase
                .from('event_reservations')
                .update({ invitationstatus: 'validated' })
                .eq('id', request.id);

            if (error) {
                throw error;
            }

            successfulNotification();
            location.reload();
        } catch (error) {
            eventReservationUpdateNotification();
        }
    }

    const rejectRequest = async (request: any) => {
        try {
            const { data, error } = await supabase
                .from('event_reservations')
                .delete()
                .eq('id', request.id);

            if (error) {
                throw error;
            }

            rejectionNotification();
            location.reload();
        } catch (error) {
            eventReservationDeleteNotification();
        }
    }

    const successfulNotification = () => toast(`Invitation status updated to "approved" successfully.`);
    const rejectionNotification = () => toast(`Event reservation deleted successfully.`);
    const eventReservationDeleteNotification = () => toast(`Error deleting event reservation.`);
    const eventReservationUpdateNotification = () => toast(`Error deleting event reservation.`);

    return (
        <>
            <div
                key={2}
                id={`tabpanel-${2}`}
                role="tabpanel"
                aria-labelledby={`tab-${2}`}
                hidden={selectedItem !== 2}
                className="tab-content mx-auto px-4 md:px-8" style={{ marginTop: "2rem" }}>


                <ToastContainer />

                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-black dark:text-gray-100 text-xl font-bold sm:text-2xl">
                            ALL ACCREDITATIONS
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Search all accreditations here.
                        </p>

                        <div className="mt-3">
                            <label className="font-medium text-gray-700 dark:text-gray-300 text-sm md:text-base">
                                The search is based on the first name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Search by first name..."
                                className="w-full mt-2 px-3 py-2 text-sm md:text-base text-black dark:text-white bg-white dark:bg-gray-800 outline-none border border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white shadow-sm rounded-lg"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                        <a
                            href="javascript:void(0)"
                            className="inline-block px-3 py-2 md:px-4 md:py-2 text-sm md:text-base text-white dark:text-black duration-150 font-medium bg-black dark:bg-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 active:bg-gray-900 dark:active:bg-gray-300"
                        >
                            Add member
                        </a>
                    </div>
                </div>

                {isLoading ? (
                    <LoadingSpinner size="large" text="Loading accreditations..." />
                ) : currentRecords.length === 0 ? (
                    <EmptyState 
                        title="No accreditations found"
                        description="There are currently no accreditations to display."
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                        }
                    />
                ) : (
                    <>
                        <div className="mt-12 shadow-sm border border-gray-300 dark:border-gray-700 rounded-lg overflow-x-auto table-container">
                            <table className="w-full table-auto text-sm text-left min-w-[800px]">
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
                                                        onClick={() => approveRequest(request)} style={{ cursor: "pointer" }}
                                                    >
                                                        Approve
                                                    </a>
                                                    <a className="py-2 leading-none px-3 font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 duration-150 rounded-lg ml-2"
                                                        onClick={() => rejectRequest(request)} style={{ cursor: "pointer" }}
                                                    >
                                                        Reject
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
        </>
    )
}
