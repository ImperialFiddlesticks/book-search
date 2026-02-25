import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Booksearchbar from "../components/Booksearchbar";
import SavedBookBar from "../components/SavedBookBar";
import { useFavoritesStore } from "../store/favoritesStore";
import { Book } from "../types/bookProps";
import { useSelectedBookStore } from "../store/useSelectedBookStore";
import Header from "../components/Header";
import PreviousSearched from "../components/PreviousSearched";
import { useStore } from "../store/previousSearched";

export default function Home() {
  const router = useRouter();
  const { favorites, isSaved, toggleFavorite, loadFavorites } =
    useFavoritesStore();
  const { setSelectedBook } = useSelectedBookStore();
  const { previousSearched } = useStore();
  useEffect(() => {
    loadFavorites();
    loadPreviousSearched();
  }, []);
  const { loadPreviousSearched } = useStore();
  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    router.push("/details");
  };

  return (
    <>
      <Header title="Book Search" />
      <View style={styles.container}>
        <Booksearchbar />
        <PreviousSearched />
        <Link href="/searchResults">
          <Text style={styles.link}>Search Results</Text>
        </Link>
        <Link href="/details">
          <Text style={styles.link}>Book Details</Text>
        </Link>
        <SavedBookBar
          books={favorites}
          onBookPress={handleBookPress}
          isSaved={isSaved}
          onToggle={toggleFavorite}
        />
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
    marginInline: "auto",
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
