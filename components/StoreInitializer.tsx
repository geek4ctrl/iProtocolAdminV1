"use client";

import { useStore } from "@/src/store";
import { useRef } from "react";

interface StoreInitializerProps {
    name: string;
    place: any[];
    event: any[];
}

function StoreInitializer({ name, place, event }: StoreInitializerProps) {

    const iniitialized = useRef(false);
    if (!iniitialized.current) {
        useStore.setState({ name, place, event });
        iniitialized.current = true;
    }

    return null;
}

export default StoreInitializer;