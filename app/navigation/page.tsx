import Link from 'next/link';

export default async function Index() {

    interface NavigationItem {
        title: string;
        path: string;
    }

    interface Post {
        title: string;
        desc: string;
        img: string;
        authorLogo: string;
        authorName: string;
        date: string;
        href: string;
    }

    interface FooterNavItem {
        href: string;
        name: string;
    }

    const navigation: NavigationItem[] = [
        { title: "Francais", path: "javascript:void(0)" },
        { title: "English", path: "javascript:void(0)" },
        { title: "Italien", path: "javascript:void(0)" },
    ];

    const posts: Post[] = [
        {
            title: "Saturday July 2, 2022",
            desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
            img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            authorName: "Abbé Ken",
            date: "Jan 4 2022",
            href: "javascript:void(0)"
        },
        {
            title: "Sunday July 3, 2022",
            desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
            img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
            authorName: "Abbé Pierrot",
            date: "Jan 4 2022",
            href: "javascript:void(0)"
        },
        {
            title: "Tuesday July 5, 2022",
            desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
            authorName: "Abbé Justin",
            date: "Jan 4 2022",
            href: "javascript:void(0)"
        },
    ];

    const footerNavs: FooterNavItem[] = [
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
    ]

    return (
        <>
            <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
                <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="javascript:void(0)">
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
                                            <a href={item.path} className="block">
                                                {item.title}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                            <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                            <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                                <li>
                                    <Link href="/login" className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none">
                                        Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link href="javascript:void(0)" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                                        Sign in
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>

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
                    <div className="mt-4">
                        <a href="javascript:void(0)" className="inline-block py-2 px-4 mr-2 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                            Kinshasa
                        </a>
                        <a href="javascript:void(0)" className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                            Lubumbashi
                        </a>
                    </div>
                </div>
            </section>

            <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
                <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        posts.map((items, key) => (
                            <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={key}>
                                <a href="javascript:void(0)">
                                    <img src={items.img} loading="lazy" alt={items.title} className="w-full h-48 rounded-t-md" />
                                    <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                        <div className="flex-none w-10 h-10 rounded-full">
                                            <img src={items.authorLogo} className="w-full h-full rounded-full" alt={items.authorName} />
                                        </div>
                                        <div className="ml-3">
                                            <span className="block text-gray-900">{items.authorName}</span>
                                            <span className="block text-gray-400 text-sm">{items.date}</span>
                                        </div>
                                    </div>
                                    <div className="pt-3 ml-4 mr-2 mb-3">
                                        <h3 className="text-xl text-gray-900">
                                            {items.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mt-1">{items.desc}</p>
                                    </div>
                                </a>
                            </article>
                        ))
                    }
                </div>
            </section>

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
