import { create } from "zustand";
interface LocationState {
  location: string;
  setLocation: (newLocation: string) => void;
}
export const locationStore = create<LocationState>((set) => ({
  location: "",
  setLocation: (newLocation) => set({ location: newLocation }),
}));
