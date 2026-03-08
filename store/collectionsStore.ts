import { Book } from "../types/bookProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CollectionsStore {
  collections: Collection[];
  isSaved: (book: Book) => boolean;
  getAllFavorites: () => Collection;
  toggleFavorite: (book: Book) => void;
  addNewCollection: (title: string, books?: Book[]) => void;
  deleteCollection: (title: string) => void;
  renameCollection: (oldTitle: string, newTitle: string) => void;
  moveBooks: (fromTitle: string, toTitle: string, bookKeys: Set<string>) => void;
}

interface Collection {
  title: string;
  books: Book[];
}

export const useCollectionsStore = create<CollectionsStore>()(
  persist(
    (set, get) => ({
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
        const allFavorites = get().collections.find(
          (c) => c.title === "All favorites",
        );
        return allFavorites ?? { title: "All favorites", books: [] };
      },

      toggleFavorite: (book: Book) => {
        let collections = get().collections;

        // Ensure "All favorites" exists in state
        if (!collections.find((c) => c.title === "All favorites")) {
          collections = [...collections, { title: "All favorites", books: [] }];
        }

        const alreadySaved = collections
          .find((c) => c.title === "All favorites")!
          .books.some((b) => b.key === book.key);

        const newCollections = collections.map((c) => {
          if (c.title === "All favorites") {
            return {
              ...c,
              books: alreadySaved
                ? c.books.filter((b) => b.key !== book.key)
                : [...c.books, book],
            };
          }
          return alreadySaved
            ? { ...c, books: c.books.filter((b) => b.key !== book.key) }
            : c;
        });

        set({ collections: newCollections });
      },

      addNewCollection: (title, books) => {
        const currentCollections = get().collections;
        const updatedCollections = [
          ...currentCollections,
          { title, books: books ?? [] },
        ];

        set({ collections: updatedCollections });
      },

      renameCollection: (oldTitle, newTitle) => {
        const currentCollections = get().collections;
        const updatedCollections = currentCollections.map((c) =>
          c.title === oldTitle ? { ...c, title: newTitle } : c,
        );
        set({ collections: updatedCollections });
      },

      moveBooks: (fromTitle, toTitle, bookKeys) => {
        const collections = get().collections;
        const from = collections.find((c) => c.title === fromTitle);
        if (!from) return;

        const booksToMove = from.books.filter((b) => bookKeys.has(b.key));

        set({
          collections: collections.map((c) => {
            if (c.title === fromTitle && fromTitle !== "All favorites") {
              return { ...c, books: c.books.filter((b) => !bookKeys.has(b.key)) };
            }
            if (c.title === toTitle) {
              const existingKeys = new Set(c.books.map((b) => b.key));
              const newBooks = booksToMove.filter((b) => !existingKeys.has(b.key));
              return { ...c, books: [...c.books, ...newBooks] };
            }
            return c;
          }),
        });
      },

      deleteCollection: (title) => {
        const currentCollections = get().collections;
        const updatedCollections = currentCollections.filter(
          (c) => c.title !== title,
        );

        set({ collections: updatedCollections });
      },
    }),
    {
      name: "collections",
      storage: createJSONStorage(() => {
        // return dummy Storage during SSR
        if (globalThis.window === undefined) {
          return {
            getItem: async () => null,
            setItem: async () => {},
            removeItem: async () => {},
          };
        }
        return AsyncStorage;
      }),
      partialize: (state) => ({ collections: state.collections }),
    },
  ),
);
