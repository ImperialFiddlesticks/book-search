
import { Book } from "../types/bookProps";
import { create } from "zustand";

interface SelectedBookStore {
  selectedBook: Book | null;
  setSelectedBook: (book: Book) => void;
}

export const useSelectedBookStore = create<SelectedBookStore>()((set) => ({
  selectedBook: null,
  setSelectedBook: (book: Book) => {
    set({ selectedBook: book });
  },
}));
