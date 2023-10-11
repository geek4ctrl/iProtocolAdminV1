import { create } from "zustand";

type State = {
    name: string;
    place: any[];
    event: any;
    chosenPlace: string;
    chosenReservationType: string;
}

type Action = {
    setName: (name: string) => void;
    setPlace: (place: any[]) => void;
    setEvent: (event: any) => void;
    setChosenPlace: (chosenPlace: string) => void;
    setReservationType: (event: State['chosenReservationType']) => void;
}

export const useStore = create<State & Action>((set) => ({
    name: "",
    place: [],
    event: null,
    chosenPlace: "",
    chosenReservationType: "",
    setName: (name) => set(() => ({ name: name })),
    setPlace: (place) => set({ place: place }),
    setEvent: (event) => set({ event: event }),
    setChosenPlace: (chosenPlace) => set({ chosenPlace: chosenPlace }),
    setReservationType: (chosenReservationType) => set({ chosenReservationType: chosenReservationType }),
}));
