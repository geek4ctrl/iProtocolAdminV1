interface FooterNavItem {
    name: string;
    href: string;
    // Add more properties as needed
}

interface FooterComponentProps {
    footerNavs: FooterNavItem[];
}

export default function FooterComponent({ footerNavs }: { footerNavs: any }) {
    return (
        <footer className="text-gray-500 px-4 py-5 max-w-screen-xl mx-auto md:px-8 mt-4" style={{ width: "-webkit-fill-available", marginTop: "2rem" }}>
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <img src="https://res.cloudinary.com/dhqvb8wbn/image/upload/v1653855971/iProtocol_icone_i1wzgx.png" className="w-32 sm:mx-auto" />
                <p className="leading-relaxed mt-2 text-[15px]">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {
                    footerNavs.map((item: any, idx: any) => (
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
    )
}