import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { Book } from "../types/bookProps";

interface FavoritesStore {
  favorites: Book[];
  toggleFavorite: (book: Book) => void;
  isSaved: (book: Book) => boolean;
  loadFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>()((set, get) => ({
  favorites: [] as Book[],
  isSaved: (book: Book) => {
    const result = get().favorites.some((f) => f.key === book.key);
    console.log(
      `isSaved called for ${book.title}:`,
      result,
      "favorites length:",
      get().favorites.length,
    );
    return result;
  },
  toggleFavorite: (book: Book) => {
    const current = get().favorites;
    const alreadySaved = current.some((f) => f.key === book.key);

    const newFavorites = alreadySaved
      ? current.filter((f) => f.key !== book.key)
      : [...current, book];

    set({ favorites: newFavorites });
    AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  },
  loadFavorites: async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      if (stored !== null) {
        set({ favorites: JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  },
}));
