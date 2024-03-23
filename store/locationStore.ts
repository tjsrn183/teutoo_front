import { create } from "zustand";

interface LocationState {
  location: string;
  setLocation: (newLocation: string) => void;
  resetLocation: () => void;
}
export const locationStore = create<LocationState>((set) => ({
  location: "",
  setLocation: (newLocation) => set({ location: newLocation }),
  resetLocation: () => set({ location: "" }),
}));
