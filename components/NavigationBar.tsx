import Link from "next/link"
import LogoutButton from "./LogoutButton"
import NavigationBarLanguagesClientComponent from "./NavigationBarLanguagesClientComponent"

interface NavigationItem {
    // Define the structure of a navigation item as needed
    name: string;
    href: string;
    // Add more properties as needed
}

interface NavigationBarProps {
    navigation: NavigationItem[];
    user: {
        email: string;
        // Add more user properties as needed
    } | null;
}

export default function NavigationBar({ navigation, user }: { navigation: any, user: any }) {

    return (
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
                            navigation.map((item: any, idx: any) => {
                                return (
                                    <NavigationBarLanguagesClientComponent item={item} idx={idx} />
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
    )

}