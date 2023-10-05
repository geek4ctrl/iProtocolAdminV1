"use client"

import { useStore } from "@/src/store"


export default function UnauthenticatedUserEventsComponent({ allEventsToDisplay }: { allEventsToDisplay: any }) {

    const allEventsToDisplayHere = useStore((state) => state.event)

    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">

                {
                    allEventsToDisplayHere?.map((items: any, key: any) => (
                        <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={key} style={{ width: "-webkit-fill-available", cursor: "pointer" }}>
                            <a href={items.href}>
                                <img src={items.eventpicture} loading="lazy" alt={items.title} className="w-full h-80 rounded-t-md" />
                                <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                    <div className="flex-none w-10 h-10 rounded-full">
                                        <img src={items.eventpicture} className="w-full h-full rounded-full" alt={items.author} />
                                    </div>
                                    <div className="ml-3">
                                        <span className="block text-gray-900">{items.author}</span>
                                        <span className="block text-gray-400 text-sm">{items.time}</span>
                                    </div>
                                </div>
                                <div className="pt-3 ml-4 mr-2 mb-3">
                                    <h3 className="text-xl text-gray-900">
                                        {items.date}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">{items.title}</p>
                                </div>
                            </a>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}