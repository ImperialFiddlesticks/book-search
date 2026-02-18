import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Booksearchbar from "./components/Booksearchbar/Booksearchbar";
import SavedBookBar from "./components/Booksearchbar/SavedBookBar";
import { useFavoritesStore } from "./store/favoritesStore";
import { Book } from "./types/bookProps";
import { useSelectedBookStore } from "./store/useSelectedBookStore";

//placeholder böcker för att kunna styla
const PLACEHOLDER_BOOKS: Book[] = [
  {
    key: "1",
    title: "The Great Gatsby",
    author_name: ["F. Scott Fitzgerald"],
    first_publish_year: 1925,
    cover_i: 153747,
  },
  {
    key: "2",
    title: "To Kill a Mockingbird",
    author_name: ["Harper Lee"],
    first_publish_year: 1960,
    cover_i: 8228691,
  },
  {
    key: "3",
    title: "1984",
    author_name: ["George Orwell"],
    first_publish_year: 1949,
    cover_i: 8575708,
  },
  {
    key: "4",
    title: "Dune",
    author_name: ["Frank Herbert"],
    first_publish_year: 1965,
    cover_i: 6895512,
  },
  {
    key: "5",
    title: "The Great Gatsby",
    author_name: ["F. Scott Fitzgerald"],
    first_publish_year: 1925,
    cover_i: 153747,
  },
  {
    key: "6",
    title: "To Kill a Mockingbird",
    author_name: ["Harper Lee"],
    first_publish_year: 1960,
    cover_i: 8228691,
  },
  {
    key: "7",
    title: "1984",
    author_name: ["George Orwell"],
    first_publish_year: 1949,
    cover_i: 8575708,
  },
  {
    key: "8",
    title: "Dune",
    author_name: ["Frank Herbert"],
    first_publish_year: 1965,
    cover_i: 6895512,
  },
  {
    key: "9",
    title: "The Great Gatsby",
    author_name: ["F. Scott Fitzgerald"],
    first_publish_year: 1925,
    cover_i: 153747,
  },
  {
    key: "10",
    title: "To Kill a Mockingbird",
    author_name: ["Harper Lee"],
    first_publish_year: 1960,
    cover_i: 8228691,
  },
  {
    key: "11",
    title: "1984",
    author_name: ["George Orwell"],
    first_publish_year: 1949,
    cover_i: 8575708,
  },
  {
    key: "12",
    title: "Dune",
    author_name: ["Frank Herbert"],
    first_publish_year: 1965,
    cover_i: 6895512,
  },
];

export default function Home() {
  const router = useRouter();
  const { favorites, isSaved, toggleFavorite, loadFavorites } =
    useFavoritesStore();
  const { setSelectedBook } = useSelectedBookStore();
  useEffect(() => {
    loadFavorites();
  }, []);
  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    router.push("/details");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FOLIO</Text>
      <Booksearchbar />
      <Link href="/searchResults">
        <Text style={styles.link}>Search Results</Text>
      </Link>
      <Link href="/details">
        <Text style={styles.link}>Book Details</Text>
      </Link>
      <SavedBookBar
        // books={favorites}
        books={PLACEHOLDER_BOOKS}
        onBookPress={handleBookPress}
        isSaved={() => true}
        onToggle={() => {}}
        // isSaved={isSaved}
        // onToggle={toggleFavorite}
      />
    </View>
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
