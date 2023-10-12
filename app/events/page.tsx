import AuthenticatedUserEvents from "@/components/AuthenticatedUserEvents";
import AuthenticatedUserEventsSubNav from "@/components/AuthenticatedUserEventsSubNav";
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import { NavigationClientComponent } from "@/components/NavigationClientComponent";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface Event {
    // Define the shape of an event
    // Modify this to match the actual structure of your events
    id: number;
    name: string;
    // Add more event properties as needed
}

interface Place {
    // Define the shape of a place
    // Modify this to match the actual structure of places
    id: number;
    name: string;
    // Add more place properties as needed
}

interface UserInformation {
    // Define the shape of user information
    // Modify this to match the actual structure of user information
    id: number;
    // Add more user information properties as needed
}

interface IndexProps {
    // Define the expected props for the Index component
    publicSupabaseUrl: string;
    publicSupabaseAnonKey: string;
}

const navigation = [
    { title: "Francais", path: "javascript:void(0)" },
    { title: "English", path: "javascript:void(0)" },
    { title: "Italien", path: "javascript:void(0)" },
];

let userInformation = {}

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const subNavigation = [
    {
        href: "javascript:void(0)",
        name: "Dashboard"
    },
    {
        href: "javascript:void(0)",
        name: "Events"
    },
    {
        href: "javascript:void(0)",
        name: "Reservations"
    }
]

const subNavIdx = 1;

export default async function Index() {
    const supabase = createServerComponentClient({ cookies });

    const events = await supabase.from("events").select();
    const allEvents: any = events.data;

    console.log('Show me all the events: ', events);

    // Fetching Goma place
    const gomaPlaces = await supabase.from('place_in_goma_view').select();
    const allGomaPlaces = gomaPlaces.data ?? [];

    // Fetching Kinshasa place
    const kinshasaPlaces = await supabase.from('place_in_kinshasa_view').select();
    const allKinshasaPlaces = kinshasaPlaces.data ?? [];

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {

        // Fetching user information
        userInformation = await supabase
            .from('users')
            .select('*')
            .eq('email', user?.email)    // Correct

    }

    return (
        <>
            <div className="w-full flex flex-col items-center">

                <NavigationBar navigation={navigation} user={user} />
                <BackButton />
                <AuthenticatedUserEventsSubNav />
                <NavigationClientComponent allGomaPlaces={allGomaPlaces} allKinshasaPlaces={allKinshasaPlaces} />
                <AuthenticatedUserEvents allEvents={allEvents} user={user} userInformation={userInformation} publicSupabaseUrl={publicSupabaseUrl} publicSupabaseAnonKey={publicSupabaseAnonKey} />
            </div>
        </>
    );
}