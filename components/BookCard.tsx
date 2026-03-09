import { Book } from "@/types/bookProps";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Card } from "react-native-paper";
import Save from "./Save";
import { useRouter } from "expo-router";
import { useSelectedBookStore } from "@/store/useSelectedBookStore";
import { useCollectionsStore } from "@/store/collectionsStore";
import { useRef } from "react";

export default function BookCard({ book }: { readonly book: Book }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.03,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const router = useRouter();
  const isSaved = useCollectionsStore((state) => state.isSaved(book));
  const { toggleFavorite } = useCollectionsStore();
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
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Card
        elevation={0}
        style={styles.card}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.cardContent}>
          <View style={styles.saveButton}>
            <Save isSaved={isSaved} onToggle={() => toggleFavorite(book)} />
          </View>
          <View style={styles.row}>
            {coverUrl ? (
              <Image source={{ uri: coverUrl }} style={styles.cover} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>No cover available.</Text>
              </View>
            )}
            <View style={styles.info}>
              <Card.Title title={book.title} titleStyle={styles.title} />
              {book.author_name && (
                <TouchableOpacity
                  onPress={(e) => handleAuthorPress(e)}
                  accessibilityRole="link"
                  accessibilityLabel={`View author ${book.author_name.join(", ")}`}
                  style={{ alignSelf: "flex-start" }}
                >
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    marginHorizontal: 0,
    backgroundColor: "transparent",
    borderRadius: 4,
    borderWidth: 0,
  },
  cardContent: { position: "relative" },
  saveButton: { position: "absolute", top: 8, right: 8, zIndex: 1 },
  row: { flexDirection: "row" },
  cover: { width: 80, height: 120, borderRadius: 4 },
  placeholder: {
    width: 80,
    height: 120,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 10,
    color: "#888",
    textAlign: "center",
    fontFamily: "SourceSans3_400Regular",
  },
  info: { flex: 1 },
  year: {
    paddingHorizontal: 16,
    color: "#888",
    fontSize: 12,
    fontFamily: "SourceSans3_400Regular",
  },
  authorName: {
    paddingHorizontal: 16,
    color: "#858585",
    fontSize: 15,
    fontFamily: "SourceSans3_600SemiBold",
  },
  title: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 18,
  },
});
