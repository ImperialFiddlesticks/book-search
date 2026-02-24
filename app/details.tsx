import { StyleSheet, Text, View } from "react-native";
import { useSelectedBookStore } from "./store/useSelectedBookStore";
import BookDetails from "./components/BookDetails";
import { useLocalSearchParams } from "expo-router";
import { useBookByIsbn } from "./hooks/openLibraryApi";
import { ActivityIndicator } from "react-native-paper";

export default function Details() {
  const { selectedBook } = useSelectedBookStore();
  const { isbn } = useLocalSearchParams();

  const {
    data: isbnData,
    isLoading: isbnIsLoading,
    isError: isbnIsError,
  } = useBookByIsbn(isbn as string);
  const isbnBook = isbnData?.docs[0] || null;
  const book = isbnBook || selectedBook;
  if (isbnIsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          accessibilityLabel="Loading"
          accessibilityRole="progressbar"
        />
      </View>
    );
  }

  if (isbn && (isbnIsError || !isbnBook)) {
    return (
      <View style={styles.container}>
        <Text>Error loading book details</Text>
      </View>
    );
  }
  if (!book) {
    return (
      <View style={styles.container}>
        <Text>No book Selected</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BookDetails book={book} />
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
