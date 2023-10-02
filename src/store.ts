import { create } from "zustand";

type State = {
    name: string
    place: [] | any[]
    event: [] | any
}

type Action = {
    setName: (name: State['name']) => void
    setPlace: (place: State['place']) => void
    setEvents: (event: State['event']) => void
}

export const useStore = create<State & Action>((set) => ({
    name: "",
    place: [],
    event: [],
    setName: (name) => set(() => ({ name: name })),
    setPlace: (place: any) => set({ place: place }),
    setEvents: (event: any) => set({ event: event }),
}));
