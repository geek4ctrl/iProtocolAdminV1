'use client'

import supabase from "./SupabaseClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthenticatedUserEventsReservationComponent({ item, user, userInformation, chosenReservationType }: { item: any, user: any, userInformation: any, chosenReservationType: any }) {

    const handleReserveClick = async (event: any) => {

        const objectDataToSend = {
            userid: user.email,
            userfirstname: userInformation?.data[0]?.firstname,
            userlastname: userInformation?.data[0]?.surname,
            userpicture: "https://res.cloudinary.com/dhqvb8wbn/image/upload/v1658596949/iprotoco…",
            eventtitle: event.title,
            eventauthor: event.author,
            eventdate: event.date,
            eventplace: event.place,
            programtime: event?.programme[0]?.time,
            programtitle: event?.programme[0]?.title,
            programpicture: event?.programme[0]?.picture,
            status: false,
            invitationstatus: "pending",
            reservationtype: chosenReservationType
        }

        const { error } = await supabase
            .from('event_reservations')
            .insert(objectDataToSend)

        if (error) {
            if (error.code === "23505") {
                // errorToDisplay = error.message;
                console.log(error?.message);
                failedNotification(error.message);
            }
        } else {
            // location.reload();
            successfulNotification();
        }

    }

    const successfulNotification = (() => toast(`Successful reservation.`));
    const failedNotification = ((reservationType: any) => toast(`Failed to make a reservation. ${reservationType}`));

    return (
        <span className="flex items-center gap-2">
            <ToastContainer />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleReserveClick(item)} style={{ color: "black", backgroundColor: "#F2E3FB" }}>
                Reserve
            </button>
        </span>
    )
}