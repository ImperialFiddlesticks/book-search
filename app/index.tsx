import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Booksearchbar from "../components/Booksearchbar";

import { useFavoritesStore } from "../store/favoritesStore";
import { Book } from "../types/bookProps";
import { useSelectedBookStore } from "../store/useSelectedBookStore";
import Header from "../components/Header";
import PreviousSearched from "../components/PreviousSearched";
import { useStore } from "../store/previousSearched";
import BookBar from "../components/BookBar";
import { useReadingListStore } from "@/store/readingListStore";

export default function Home() {
  const router = useRouter();
  const {
    favorites,
    isSaved: isFavorited,
    toggleFavorite,
    loadFavorites,
  } = useFavoritesStore();

  const { readingList, toggleReadingList, loadReadingList } =
    useReadingListStore();
  const { setSelectedBook } = useSelectedBookStore();
  const { previousSearched, loadPreviousSearched } = useStore();
  useEffect(() => {
    loadFavorites();
    loadPreviousSearched();
    loadReadingList();
  }, []);

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    router.push("/details");
  };

  return (
    <>
      <Header title="FOLIO" />
      <View style={styles.container}>
        <ScrollView>
          <Booksearchbar />
          <PreviousSearched />

          <BookBar
            title="Favorites"
            emptyMessage="No favorites yet..."
            books={favorites}
            onBookPress={handleBookPress}
            isSaved={isFavorited}
            onToggle={toggleFavorite}
          />
          <BookBar
            title="Reading list"
            emptyMessage="No books in reading list yet..."
            onBookPress={handleBookPress}
            books={readingList}
            isSaved={isFavorited}
            onToggle={toggleFavorite}
            onLongPress={(book) => toggleReadingList(book)}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  link: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
});
