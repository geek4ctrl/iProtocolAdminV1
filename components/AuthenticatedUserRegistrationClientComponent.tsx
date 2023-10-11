'use client'

import { useState } from "react";
import supabase from "./SupabaseClient";

interface UserTitle {
    value: string;
    // Add more properties as needed
}

interface UserDesignation {
    value: string;
    // Add more properties as needed
}

interface User {
    email: string;
    // Add more properties as needed
}

interface AuthenticatedUserRegistrationClientComponentProps {
    userTitle: UserTitle[];
    userDesignation: UserDesignation[];
    user: User;
    publicSupabaseUrl: any; // Replace 'any' with the appropriate type
    publicSupabaseAnonKey: any; // Replace 'any' with the appropriate type
}

export default function AuthenticatedUserRegistrationClientComponent({ userTitle, userDesignation, user, publicSupabaseUrl, publicSupabaseAnonKey }: { userTitle: any, userDesignation: any, user: any, publicSupabaseUrl: any, publicSupabaseAnonKey: any }) {

    let [errorToDisplay, setErrorToDisplay] = useState<any>()

    async function onSubmit(event: any) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const title = String(formData.get('title'))
        const firstname = String(formData.get('firstname'))
        const surname = String(formData.get('surname'))
        const postname = String(formData.get('postname'))
        const category = String(formData.get('category'))
        const diocese = String(formData.get('diocese'))
        const uploadpicture = String(formData.get('uploadpicture'))
        const uploaddocument = String(formData.get('uploaddocument'))
        const email = 'ema@gmail.com'

        const formDataToSend = {
            title,
            firstname,
            surname,
            postname,
            email,
            category,
            diocese,
            uploadpicture,
            uploaddocument,
        }

        const { error } = await supabase
            .from('users')
            .insert(formDataToSend)

        if (error) {
            if (error.code === "23505") {
                // errorToDisplay = error.message;
                setErrorToDisplay(error?.message);
            }
        } else {
            location.reload();
        }

    }

    return (
        <form
            className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            onSubmit={onSubmit}
        >

            <select name="title" className="rounded-md px-4 py-2 bg-inherit border mb-6 mt-8">
                {userTitle.map(function (n: any) {
                    return (<option value={n.value}>{n.value}</option>);
                })}
            </select>

            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="text"
                name="firstname"
                placeholder="Firstname *"
                required
            />

            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="surname"
                placeholder="Surname *"
                required
            />

            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="text"
                name="postname"
                placeholder="Post name *"
                required
            />


            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="text"
                name="email"
                placeholder={user.email}
                value={user.email}
                required
                disabled
            />

            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="text"
                name="category"
                placeholder="Category"
                required
            />

            <select name="diocese" className="rounded-md px-4 py-2 bg-inherit border mb-6">
                {userDesignation.map(function (n: any) {
                    return (<option value={n.value}>{n.value}</option>);
                })}
            </select>

            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="text"
                name="uploadpicture"
                placeholder="Upload a picture"
                required
            />

            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="text"
                name="uploaddocument"
                placeholder="Upload documents"
                required
            />

            <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
                Clear
            </button>
            <button
                className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
            >
                Register
            </button>

            {errorToDisplay ? <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-red-500 bg-red-50 md:max-w-2xl md:mx-auto md:px-8" style={{ backgroundColor: "#FEF2F2" }}>
                <div className="flex justify-between py-3">
                    <div className="flex">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="self-center ml-3">
                            <span className="text-red-600 font-semibold">
                                Error
                            </span>
                            <p className="text-red-600 mt-1">
                                {errorToDisplay}
                            </p>
                        </div>
                    </div>
                    <button className="self-start text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div> : ''}

        </form>
    )
}