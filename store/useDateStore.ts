import { create } from "zustand";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface DateState {
  date: Value;
  setDate: (date: Value) => void;
  resetDate: () => void;
}
export const useDateStore = create<DateState>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date: date }),
  resetDate: () => set({ date: new Date() }),
}));
