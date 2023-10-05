"use client";

import { useStore } from "@/src/store";
import { useRef } from "react";

function StoreInitializer({ name, place, event }: { name: string, place: any[], event: any[] }) {

    const iniitialized = useRef(false);
    if (!iniitialized.current) {
        useStore.setState({ name, place, event });
        iniitialized.current = true;
    }

    return null;
}

export default StoreInitializer;