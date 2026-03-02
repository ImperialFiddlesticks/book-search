import { Book } from "../types/bookProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface CollectionsStore {
  collections: Collection[];
  isSaved: (book: Book) => boolean;
  getAllFavorites: () => Collection;
  toggleFavorite: (book: Book) => void;
  loadCollections: () => Promise<void>;
  addNewCollection: (title: string, books?: Book[]) => void;
  deleteCollection?: (title: string) => void;
  updateCollection?: (title: string, books: Book[]) => void;
}

interface Collection {
  title: string;
  books: Book[];
}

export const useCollectionsStore = create<CollectionsStore>()((set, get) => ({
  collections: [] as Collection[],

  isSaved: (book: Book) => {
    const allFavorites = get().collections.find(
      (c) => c.title === "All favorites",
    );
    return allFavorites
      ? allFavorites.books.some((f) => f.key === book.key)
      : false;
  },

  getAllFavorites: () => {
    let allFavorites = get().collections.find(
      (c) => c.title === "All favorites",
    );

    if (!allFavorites) {
      allFavorites = { title: "All favorites", books: [] };
      const collections = [...get().collections, allFavorites];
      set({ collections });
    }

    return allFavorites;
  },

  toggleFavorite: async (book: Book) => {
    const alreadySaved = get()
      .getAllFavorites()
      .books.some((b) => b.key === book.key);

    let newCollections: Collection[];

    if (alreadySaved) {
      newCollections = get().collections.map((c) => {
        return {
          ...c,
          books: c.books.filter((b) => b.key !== book.key),
        };
      });
    } else {
      newCollections = get().collections.map((c) => {
        if (c.title === "All favorites") {
          return {
            ...c,
            books: [...c.books, book],
          };
        }

        return c;
      });
    }  

    set({ collections: newCollections });
  },

  loadCollections: async () => {
    try {
      const storedCollections =
        (await AsyncStorage.getItem("collections")) || "[]";
      set({ collections: JSON.parse(storedCollections) });
    } catch (error) {
      console.error("Failed to load collections", error);
    }
  },

  addNewCollection: (title, books) => {
    const currentCollections = get().collections;
    const updatedCollections = [
      ...currentCollections,
      { title, books: books ?? [] },
    ];

  },

  deleteCollection: (title) => {
    const currentCollections = get().collections;
    const updatedCollections = currentCollections.filter(
      (c) => c.title !== title,
    );

    set({ collections: updatedCollections });
  },
}));
