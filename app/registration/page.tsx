import AuthenticatedUserRegistrationClientComponent from '@/components/AuthenticatedUserRegistrationClientComponent';
import LogoutButton from '@/components/LogoutButton';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const navigation = [
    { title: "Francais", path: "javascript:void(0)" },
    { title: "English", path: "javascript:void(0)" },
    { title: "Italien", path: "javascript:void(0)" },
];

const footerNavs = [
    {
        href: 'javascript:void()',
        name: 'About'
    },
    {
        href: 'javascript:void()',
        name: 'Blog'
    },
    {
        href: 'javascript:void()',
        name: ''
    },
    {
        href: 'javascript:void()',
        name: 'Team'
    },
    {
        href: 'javascript:void()',
        name: 'Careers'
    },
    {
        href: 'javascript:void()',
        name: 'Support'
    }
];

const menuItems = ["Products", "Documentation", "Features", "Partners", "Industry", "Feedback", "Tech stack"]

interface Title {
    value: string;
    viewValue: string;
}

interface Designation {
    value: string;
    viewValue: string;
}

const userTitle: Title[] = [
    { value: 'cardinal', viewValue: 'Steak' },
    { value: 'monseigneur', viewValue: 'Pizza' },
    { value: 'excellence', viewValue: 'Tacos' },
    { value: 'honorable', viewValue: 'Pizza' },
    { value: 'abbe', viewValue: 'Tacos' },
    { value: 'pere', viewValue: 'Pizza' },
    { value: 'soeur', viewValue: 'Tacos' },
    { value: 'frere', viewValue: 'Pizza' },
    { value: 'mr', viewValue: 'Tacos' },
    { value: 'mme', viewValue: 'Pizza' },
    { value: 'mlle', viewValue: 'Tacos' },
];

const userDesignation: Designation[] = [
    { value: 'corpsMedical', viewValue: 'Steak' },
    { value: 'agentPresse', viewValue: 'Pizza' },
    { value: 'securite', viewValue: 'Tacos' },
    { value: 'officielGouvernementC1', viewValue: 'Pizza' },
    { value: 'officielGouvernementC2', viewValue: 'Tacos' },
    { value: 'officielGouvernementC3', viewValue: 'Tacos' },
    { value: 'officielEcclesialC1', viewValue: 'Pizza' },
    { value: 'officielEcclesialC2', viewValue: 'Tacos' },
    { value: 'liturgieConcelebrant', viewValue: 'Pizza' },
    { value: 'liturgieC1', viewValue: 'Pizza' },
    { value: 'liturgieC2', viewValue: 'Pizza' },
    { value: 'personnesAssistees', viewValue: 'Pizza' },
    { value: 'religieux', viewValue: 'Tacos' },
    { value: 'staff', viewValue: 'Pizza' },
    { value: 'protocol', viewValue: 'Pizza' },
];

export default async function Registration() {

    const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (

        <>
            <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
                <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="/">
                            <img
                                src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1653855971/iProtocol_icone_i1wzgx.png"
                                width={120}
                                height={50}
                                alt="Float UI logo"
                            />
                        </a>
                        <div className="md:hidden">
                            <button className="text-gray-500 hover:text-gray-800"
                            >
                                {
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${'block'}`}>
                        <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, idx) => {
                                    return (
                                        <li key={idx} className="text-gray-700 hover:text-indigo-600">
                                            <a href="javascript:void(0)" className="block">
                                                {item.title}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                            <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                            <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>

                                {user ? (
                                    <div className="flex items-center gap-4">
                                        Hey, {user.email}!
                                        <LogoutButton />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Link href="/login" className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                                            Log in
                                        </Link>

                                        <Link href="/login" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                                            Sign in
                                        </Link>
                                    </div>
                                )}

                            </div>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
                <Link
                    href="/"
                    className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>{' '}
                    Back
                </Link>

                <AuthenticatedUserRegistrationClientComponent userTitle={userTitle} userDesignation={userDesignation} user={user} publicSupabaseUrl={publicSupabaseUrl} publicSupabaseAnonKey={publicSupabaseAnonKey} />

            </div>

            <footer className="text-gray-500 px-4 py-5 max-w-screen-xl mx-auto md:px-8 mt-4" style={{ width: "-webkit-fill-available", marginTop: "2rem" }}>
                <div className="max-w-lg sm:mx-auto sm:text-center">
                    <img src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1653855971/iProtocol_icone_i1wzgx.png" className="w-32 sm:mx-auto" />
                    <p className="leading-relaxed mt-2 text-[15px]">
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                    {
                        footerNavs.map((item, idx) => (
                            <li className=" hover:text-gray-800">
                                <a key={idx} href={item.href}>
                                    {item.name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
                <div className="mt-8 items-center justify-between sm:flex" >
                    <div className="mt-4 sm:mt-0">
                        &copy; 2023 iProtocol All rights reserved.
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <ul className="flex items-center space-x-4">
                        </ul>
                    </div>
                </div>
            </footer>

        </>

    )
}
