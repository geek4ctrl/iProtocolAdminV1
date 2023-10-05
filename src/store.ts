import { create } from "zustand";

type State = {
    name: string
    place: [] | any[]
    event: [] | any
    chosenPlace: string
    chosenReservationType: string
}

type Action = {
    setName: (name: State['name']) => void
    setPlace: (place: State['place']) => void
    setEvent: (event: State['event']) => void
    setReservationType: (event: State['chosenReservationType']) => void
}

export const useStore = create<State & Action>((set) => ({
    name: "",
    place: [],
    event: [],
    chosenPlace: "",
    chosenReservationType: "",
    setName: (name) => set(() => ({ name: name })),
    setPlace: (place: any) => set({ place: place }),
    setEvent: (event: any) => set({ event: event }),
    setChosenPlace: (chosenPlace: any) => set({ chosenPlace: chosenPlace }),
    setReservationType: (chosenReservationType: any) => set({ chosenReservationType: chosenReservationType }),
}));
