import { Book } from "../types/bookProps";
import { create } from "zustand";

type SearchMode = "books" | "author";

interface SearchStore {
  searchMode: SearchMode;
  authorName: string | null;
  searchByAuthor: (authorName: string) => void;
  resetToBooks: () => void;
}
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

export const useSearchStore = create<SearchStore>()((set) => ({
  searchMode: "books",
  authorName: null,
  searchByAuthor: (name: string) => {
    set({ searchMode: "author", authorName: name });
  },
  resetToBooks: () => {
    set({ searchMode: "books", authorName: null });
  },
}));
