import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Booksearchbar from "../components/Booksearchbar";
import { useCollectionsStore } from "@/store/collectionsStore";
import { Book } from "../types/bookProps";
import { useSelectedBookStore } from "../store/useSelectedBookStore";
import Header from "../components/Header";
import PreviousSearched from "../components/PreviousSearched";
import { useStore } from "../store/previousSearched";
import BookBar from "../components/BookBar";
import { useReadingListStore } from "@/store/readingListStore";

const EMPTY_BOOKS: Book[] = [];

export default function Home() {
  const router = useRouter();
  const favoriteBooks = useCollectionsStore(
    (state) =>
      state.collections.find((c) => c.title === "All favorites")?.books ??
      EMPTY_BOOKS,
  );

  const { readingList, toggleReadingList, loadReadingList } =
    useReadingListStore();
  const { setSelectedBook } = useSelectedBookStore();
  const { previousSearched, loadPreviousSearched } = useStore();
  useEffect(() => {
    loadPreviousSearched();
    loadReadingList();
  }, []);

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    router.push("/details");
  };

  return (
    <>
      <Header title="FOLIO" showBackButton={false} />
      <View style={styles.container}>
        <ScrollView
          style={{ width: "100%" }}
          accessibilityLabel="Home screen content"
        >
          <Booksearchbar />
          <PreviousSearched />

          <BookBar
            title="Favorites"
            emptyMessage="No favorites yet..."
            books={[...favoriteBooks].reverse().slice(0, 10)}
            onBookPress={handleBookPress}
          />
          <BookBar
            title="Reading list"
            emptyMessage="No books in reading list yet..."
            onBookPress={handleBookPress}
            books={readingList}
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
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    // alignItems: "center",
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
