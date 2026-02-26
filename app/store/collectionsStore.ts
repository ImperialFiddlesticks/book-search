import { Book } from "../types/bookProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface CollectionsStore {
  collections: Collection[];
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

    set({ collections: updatedCollections });

    AsyncStorage.setItem("collections", JSON.stringify(updatedCollections));
  },

  deleteCollection: (title) => {
    const currentCollections = get().collections;
    const updatedCollections = currentCollections.filter(
      (c) => c.title !== title,
    );

    set({ collections: updatedCollections });

    AsyncStorage.setItem("collections", JSON.stringify(updatedCollections));
  },
}));
