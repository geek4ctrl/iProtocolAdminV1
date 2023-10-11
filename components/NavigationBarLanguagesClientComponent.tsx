"use client"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NavigationItem {
    // Define the structure of a navigation item as needed
    title: string;
    // Add more properties as needed
}

interface NavigationBarLanguagesClientComponentProps {
    item: NavigationItem;
    idx: number;
}

export default function NavigationBarLanguagesClientComponent({ item, idx }: { item: any, idx: any }) {

    const notify = () => toast("Internationalization hasn't been applied");

    return (
        <li key={idx} className="text-gray-700 hover:text-indigo-600" onClick={notify}>
            <ToastContainer />
            <a href="javascript:void(0)" className="block">
                {item.title}
            </a>
        </li>
    )
}
