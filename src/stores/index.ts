import { atom } from "jotai";
export const drawerOpenAtom = atom<boolean>(false);
export const selectedPropertyAtom = atom<"Hostel" | "Bedsitter" | "1 Bedroom" | "2 Bedroom" | "3 Bedroom">("Bedsitter");
