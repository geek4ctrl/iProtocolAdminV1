'use client'

import { useStore } from "@/src/store";

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


export function NavigationClientComponent({ allGomaPlaces, allKinshasaPlaces }: { allGomaPlaces: any, allKinshasaPlaces: any }) {

    const { name } = useStore();
    const allPlaces = useStore((state) => state.place)
    const allEvents = useStore((state) => state.event)

    function choosePlace(place: any) {
        if (place == 'Goma') {
            useStore.setState((state) => ({
                event: allGomaPlaces
            }))
        } else {
            useStore.setState((state) => ({
                event: allKinshasaPlaces
            }))
        }
    }

    return (
        <section className="py-28" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)", width: "-webkit-fill-available" }}>
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl space-y-3 md:mx-auto">
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Program of the papal visit
                    </p>
                    <p className="text-gray-600">
                        Always arrive 2 hours before
                    </p>
                </div>

                <div className="mt-4" style={{ cursor: "pointer" }}>
                    {
                        allPlaces?.map((items: any, key: any) => (

                            <a className="inline-block py-2 px-4 mr-2 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none" onClick={() => choosePlace(items.place)}>
                                {items.place}
                            </a>

                        ))
                    }
                </div>

            </div>
        </section>
    )

}