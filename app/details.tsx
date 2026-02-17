import { StyleSheet, Text, View } from "react-native";
import { useSelectedBookStore } from "./store/useSelectedBookStore";
import { useFavoritesStore } from "./store/favoritesStore";
import BookDetails from "./components/Booksearchbar/BookDetails";

export default function Details() {
  const { selectedBook } = useSelectedBookStore();
  const { isSaved, toggleFavorite } = useFavoritesStore();

  if (!selectedBook) {
    return (
      <View style={styles.container}>
        <Text>No book Selected</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BookDetails
        book={selectedBook}
        isSaved={isSaved(selectedBook)}
        onToggle={() => toggleFavorite(selectedBook)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
