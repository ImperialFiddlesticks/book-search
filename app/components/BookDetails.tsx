import { Book } from "@/app/types/bookProps";
import SavedProps from "@/app/types/savedProps";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";
import { Card, Text } from "react-native-paper";
import Save from "./Save";
import { useBookDescription } from "@/app/hooks/openLibraryApi";
import { useFavoritesStore } from "../store/favoritesStore";

interface BookDetailProps extends SavedProps {
  readonly book: Book;
}

export default function BookDetails({ book }: { book: Book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const { data, isLoading, isError } = useBookDescription(book.key);
  const { favorites, isSaved, toggleFavorite } = useFavoritesStore();
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.saveButton}>
          <Save isSaved={isSaved(book)} onToggle={() => toggleFavorite(book)} />
        </View>
        <View style={styles.coverBox}>
          {coverUrl ? (
            <Image source={{ uri: coverUrl }} style={styles.cover} />
          ) : (
            <View style={styles.placeholder}>
              <Text>No cover available.</Text>
            </View>
          )}
        </View>
        <View style={styles.info}>
          <Card.Title
            title={book.title}
            subtitle={book.author_name?.join(", ") ?? "Unknown Author"}
          />
          <Card.Content>
            {book.first_publish_year && (
              <Text>First Published: {book.first_publish_year}</Text>
            )}
            {book.number_of_pages_median && (
              <Text>Pages: {book.number_of_pages_median}</Text>
            )}
            {book.isbn && <Text>ISBN: {book.isbn}</Text>}
            <View>
              {isLoading && <ActivityIndicator />}
              {isError && <Text>Description unavailable.</Text>}
              {data && <Text>{data}</Text>}
            </View>
            {!isLoading && !isError && !data && (
              <Text>No description available.</Text>
            )}
          </Card.Content>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 8, marginHorizontal: 16 },
  cardContent: { position: "relative" },
  saveButton: { position: "absolute", top: 10, right: 10, zIndex: 1 },
  coverBox: { display: "flex", justifyContent: "center" },
  cover: { height: 240, width: 160, borderRadius: 10 },
  placeholder: {
    width: 160,
    height: 240,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  info: { flex: 1 },
});
