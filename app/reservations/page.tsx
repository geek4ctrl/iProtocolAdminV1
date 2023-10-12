import AurhenticatedUserReservationsSubNav from "@/components/AurhenticatedUserReservationsSubNav";
import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

let userInformation = {};

const navigation = [
    { title: "Francais", path: "javascript:void(0)" },
    { title: "English", path: "javascript:void(0)" },
    { title: "Italien", path: "javascript:void(0)" },
];

const tableItems = [
    {
        avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        name: "Liam James",
        email: "liamjames@example.com",
        phone_nimber: "+1 (555) 000-000",
        position: "Software engineer",
        salary: "$100K"
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        name: "Olivia Emma",
        email: "oliviaemma@example.com",
        phone_nimber: "+1 (555) 000-000",
        position: "Product designer",
        salary: "$90K"
    },
    {
        avatar: "https://randomuser.me/api/portraits/women/79.jpg",
        name: "William Benjamin",
        email: "william.benjamin@example.com",
        phone_nimber: "+1 (555) 000-000",
        position: "Front-end developer",
        salary: "$80K"
    },
    {
        avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        name: "Henry Theodore",
        email: "henrytheodore@example.com",
        phone_nimber: "+1 (555) 000-000",
        position: "Laravel engineer",
        salary: "$120K"
    },
    {
        avatar: "https://images.unsplash.com/photo-1439911767590-c724b615299d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        name: "Amelia Elijah",
        email: "amelia.elijah@example.com",
        phone_nimber: "+1 (555) 000-000",
        position: "Open source manager",
        salary: "$75K"
    },
];

const members = [
    {
        avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
        name: "John lorin",
        email: "john@example.com"
    }, {
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        name: "Chris bondi",
        email: "chridbondi@example.com"
    }, {
        avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
        name: "yasmine",
        email: "yasmine@example.com"
    }, {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
        name: "Joseph",
        email: "joseph@example.com"
    },
];

export default async function Index() {
    const supabase = createServerComponentClient({ cookies });

    // const { data: countries } = await supabase.from("countries").select();

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
                <AurhenticatedUserReservationsSubNav />
            </div>

            <div className="max-w-2xl mx-auto px-4">

                <ul className="mt-12 divide-y">
                    {
                        members.map((item, idx) => (
                            <li key={idx} className="py-5 flex items-start justify-between">
                                <div className="flex gap-3">
                                    <img src={item.avatar} className="flex-none w-12 h-12 rounded-full" />
                                    <div>
                                        <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                                        <span className="block text-sm text-gray-600">{item.email}</span>
                                    </div>
                                </div>
                                <a href="javascript:void(0)" className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">Manage</a>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </>
    );
}
