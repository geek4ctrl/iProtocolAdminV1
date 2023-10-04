"use client";

import { useStore } from "@/src/store";
import { useRef } from "react";

function StoreInitializer({ name, place }: { name: string, place: any[] }) {

    const iniitialized = useRef(false);
    if (!iniitialized.current) {
        useStore.setState({ name, place });
        iniitialized.current = true;
    }

    return null;
}

export default StoreInitializer;