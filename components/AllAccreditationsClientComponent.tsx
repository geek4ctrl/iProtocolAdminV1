'use client'

import { useStore } from '@/src/store';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from './SupabaseClient';

export default function AllAccreditationsClientComponent({ allAccreditations }: { allAccreditations: any }) {

    // Search section
    const [search, setSearch] = useState('');

    const allAccreditationsAfterFilter = {
        nodes: allAccreditations.filter((item: any) =>
            item.userfirstname.toLowerCase().includes(search.toLowerCase())
        ),
    };

    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    };

    // Pagination section
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
                className="mx-auto px-4 md:px-8" style={{ marginTop: "2rem" }}>


                <ToastContainer />

                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            ALL ACCREDITATIONS
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Search all accreditations here.
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
                                            <a className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                                onClick={() => approveRequest(request)} style={{ cursor: "pointer" }}
                                            >
                                                Approve
                                            </a>
                                            <a className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
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

                <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
                    <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
                        <a href="javascript:void(0)" className="hover:text-indigo-600 flex items-center gap-x-2" onClick={goToPrevPage}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <ul className="flex items-center gap-1">
                            {
                                pageNumbers.map((pgNumber, idx) => (
                                    <li key={pgNumber}
                                        className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                                        <a aria-current={currentPage == pgNumber ? "page" : false} className={`page-link px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${currentPage == pgNumber ? "bg-indigo-50 text-indigo-600 font-medium" : ""}`} onClick={() => setCurrentPage(pgNumber)} href='#'>

                                            {pgNumber}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                        <a href="javascript:void(0)" className="hover:text-indigo-600 flex items-center gap-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
                        <a href="javascript:void(0)" className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50" onClick={goToPrevPage}>Previous</a>
                        <div className="font-medium">
                            {/* Page {currentPage} of {pages.length} */}
                        </div>
                        <a href="javascript:void(0)" className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50" onClick={goToNextPage}>Next</a>
                    </div>
                </div>
            </div>
        </>
    )
}
