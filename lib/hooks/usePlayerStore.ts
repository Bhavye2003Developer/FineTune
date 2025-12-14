import { create } from "zustand";
import { VAFile } from "../db";
import { toast } from "sonner";

interface PlayerState {
  selectedFile: null | VAFile;
  nextFile: null | VAFile;
  selectFile: (file: VAFile) => void;
  addToNext: (file: VAFile) => void;
}

const usePlayerStore = create<PlayerState>()((set) => ({
  selectedFile: null,
  nextFile: null,
  selectFile(file) {
    set((state) => ({ ...state, selectedFile: file }));
  },
  addToNext(file) {
    set((state) => ({ ...state, nextFile: file }));
    toast.success("Added to queue");
  },
}));

export default usePlayerStore;
