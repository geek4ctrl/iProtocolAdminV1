import { create } from "zustand";

type State = {
    name: string
    place: [] | any[]
    event: [] | any
    chosenPlace: string
}

type Action = {
    setName: (name: State['name']) => void
    setPlace: (place: State['place']) => void
    setEvent: (event: State['event']) => void
}

export const useStore = create<State & Action>((set) => ({
    name: "",
    place: [],
    event: [],
    chosenPlace: "",
    setName: (name) => set(() => ({ name: name })),
    setPlace: (place: any) => set({ place: place }),
    setEvent: (event: any) => set({ event: event }),
    setChosenPlace: (chosenPlace: any) => set({ chosenPlace: chosenPlace })
}));
