import { Book } from "@/app/hooks/useBookSearch";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function BookCard({ book }: { book: Book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.cover} />
        ) : (
          <View style={styles.placeholder} />
        )}
        <View style={styles.info}>
          <Card.Title
            title={book.title}
            subtitle={book.author_name?.join(", ")}
          />

          {book.first_publish_year && (
            <Text style={styles.year}>{book.first_publish_year}</Text>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 8, marginHorizontal: 16 },
  row: { flexDirection: "row" },
  cover: { width: 80, height: 120, borderRadius: 4 },
  placeholder: {
    width: 80,
    height: 120,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  info: { flex: 1 },
  year: { paddingHorizontal: 16, color: "#888", fontSize: 12 },
});
