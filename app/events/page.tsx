import AuthenticatedUserEvents from "@/components/AuthenticatedUserEvents";
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import { NavigationClientComponent } from "@/components/NavigationClientComponent";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const navigation = [
    { title: "Francais", path: "javascript:void(0)" },
    { title: "English", path: "javascript:void(0)" },
    { title: "Italien", path: "javascript:void(0)" },
];

let userInformation = {}

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function Index() {
    const supabase = createServerComponentClient({ cookies });

    const events = await supabase.from("events").select();
    const allEvents = events.data;

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
                <NavigationClientComponent allGomaPlaces={allGomaPlaces} allKinshasaPlaces={allKinshasaPlaces} />
                <AuthenticatedUserEvents allEvents={allEvents} user={user} userInformation={userInformation} publicSupabaseUrl={publicSupabaseUrl} publicSupabaseAnonKey={publicSupabaseAnonKey} />
            </div>
        </>
    );
}