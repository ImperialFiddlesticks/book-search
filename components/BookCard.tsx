import { Book } from "@/types/bookProps";
import SavedProps from "@/types/savedProps";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import Save from "./Save";
import { useRouter } from "expo-router";
import { useSelectedBookStore } from "@/store/useSelectedBookStore";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function BookCard({ book }: { book: Book }) {
  const router = useRouter();
  const isSaved = useFavoritesStore((state) =>
    state.favorites.some((f) => f.key === book.key),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const { setSelectedBook } = useSelectedBookStore();
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const handleAuthorPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    const key = book.author_key?.[0];
    if (key) router.push(`/author/${key}`);
  };
  const handlePress = () => {
    setSelectedBook(book);
    router.push("/details");
  };
  return (
    <Card style={styles.card} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View style={styles.saveButton}>
          <Save isSaved={isSaved} onToggle={() => toggleFavorite(book)} />
        </View>
        <View style={styles.row}>
          {coverUrl ? (
            <Image source={{ uri: coverUrl }} style={styles.cover} />
          ) : (
            <View style={styles.placeholder}>
              <Text>No cover available.</Text>
            </View>
          )}
          <View style={styles.info}>
            <Card.Title title={book.title} titleStyle={styles.title} />
            {book.author_name && (
              <TouchableOpacity onPress={(e) => handleAuthorPress(e)}>
                <Text style={styles.authorName}>
                  {book.author_name.join(", ")}
                </Text>
              </TouchableOpacity>
            )}

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
  card: { marginBottom: 8, marginHorizontal: 16, backgroundColor: "white" },
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
  authorName: { paddingHorizontal: 16, color: "#858585", fontSize: 15 },
  title: {
    fontWeight: "700",
    fontSize: 18,
  },
});
