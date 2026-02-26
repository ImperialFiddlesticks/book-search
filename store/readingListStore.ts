import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { Book } from "@/types/bookProps";

interface ReadingListStore {
  readingList: Book[];
  toggleReadingList: (book: Book) => Promise<void>;
  isSaved: (book: Book) => boolean;
  loadReadingList: () => Promise<void>;
}

export const useReadingListStore = create<ReadingListStore>()((set, get) => ({
  readingList: [] as Book[],
  isSaved: (book: Book) => {
    const result = get().readingList.some((b) => b.key === book.key);
    return result;
  },
  toggleReadingList: async (book: Book) => {
    const current = get().readingList;
    const alreadySaved = current.some((b) => b.key === book.key);

    const newReadingList = alreadySaved
      ? current.filter((b) => b.key !== book.key)
      : [...current, book];
    set({ readingList: newReadingList });
    try {
      await AsyncStorage.setItem("readingList", JSON.stringify(newReadingList));
    } catch (error) {
      console.error("Failed to save Reading List", error);
    }
  },
  loadReadingList: async () => {
    try {
      const stored = await AsyncStorage.getItem("readingList");
      if (stored !== null) {
        set({ readingList: JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Failed to load Reading List", error);
    }
  },
}));
