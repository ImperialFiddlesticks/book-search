import { Book } from "@/app/types/bookProps";
import { SavedProps } from "@/app/types/savedProps";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import Save from "./Save";

interface BookCardProps extends SavedProps {
  readonly book: Book;
}
export default function BookCard({ book, isSaved, onToggle }: BookCardProps) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.saveButton}>
          <Save isSaved={isSaved} onToggle={onToggle} />
        </View>
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
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 8, marginHorizontal: 16 },
  cardContent: { position: "relative" },
  saveButton: { position: "absolute", top: 8, right: 8, zIndex: 1 },
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
