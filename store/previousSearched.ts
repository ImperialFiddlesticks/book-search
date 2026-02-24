import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PreviousSearchedStore {
  previousSearched: string[];
  addPreviousSearched(query: string): void;
  loadPreviousSearched(): Promise<void>;
}

export const useStore = create<PreviousSearchedStore>()((set, get) => ({
  previousSearched: [],

  addPreviousSearched: (query: string) => {
    const current = get().previousSearched;
    const updated = [query, ...current.filter((q) => q !== query)].slice(0, 10);
    set({ previousSearched: updated });
    AsyncStorage.setItem("previousSearched", JSON.stringify(updated));
  },
  loadPreviousSearched: async () => {
    try {
      const previousSearched = await AsyncStorage.getItem("previousSearched");
      if (previousSearched !== null) {
        set({ previousSearched: JSON.parse(previousSearched) });
      }
    } catch (error: unknown) {
      console.error("Failed to load history", error);
    }
  },
}));
