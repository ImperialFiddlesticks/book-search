import { StyleSheet, Text, View } from "react-native";
import BookCard from "./components/Booksearchbar/BookCard";

export default function SearchResults() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results</Text>
      <BookCard
        book={{
          key: "/works/OL82563W",
          title: "The Lord of the Rings",
          author_name: ["J.R.R. Tolkien"],
          first_publish_year: 1954,
          cover_i: 9255566,
        }}
        isSaved={false}
        onToggle={() => {}}
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
