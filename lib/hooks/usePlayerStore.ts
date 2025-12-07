import { create } from "zustand";
import { VAFile } from "../db";

interface PlayerState {
  selectedFile: null | VAFile;
  selectFile: (file: VAFile) => void;
}

const usePlayerStore = create<PlayerState>()((set) => ({
  selectedFile: null,
  selectFile(file) {
    set((state) => ({ ...state, selectedFile: file }));
  },
}));

export default usePlayerStore;
