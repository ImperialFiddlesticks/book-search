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

export default function BookCard({
  book,
  showTitle,
  showAuthor,
  onLongPress,
  hideSave,
}: {
  readonly book: Book;
  readonly showTitle?: boolean;
  readonly showAuthor?: boolean;
  readonly onLongPress?: () => void;
  readonly hideSave?: boolean;
}) {
  const compact = showTitle || showAuthor;
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
  if (compact) {
    return (
      <Card elevation={0} style={styles.compactCard} onPress={handlePress} onLongPress={onLongPress}>
        <View>
          {coverUrl ? (
            <Image source={{ uri: coverUrl }} style={styles.compactCover} />
          ) : (
            <View style={styles.compactPlaceholder}>
              <Text style={styles.placeholderText}>No cover</Text>
            </View>
          )}
          {!hideSave && (
            <View style={styles.compactSaveButton}>
              <Save isSaved={isSaved} onToggle={() => toggleFavorite(book)} />
            </View>
          )}
        </View>
        {showTitle && (
          <Text style={styles.compactTitle} numberOfLines={2}>
            {book.title}
          </Text>
        )}
        {showAuthor && book.author_name && (
          <Text style={styles.compactAuthor} numberOfLines={1}>
            {book.author_name.join(", ")}
          </Text>
        )}
      </Card>
    );
  }

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
  compactCard: {
    backgroundColor: "transparent",
    width: 120,
    padding: 4,
  },
  compactCover: {
    width: 112,
    height: 160,
    borderRadius: 4,
  },
  compactPlaceholder: {
    width: 112,
    height: 160,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  compactSaveButton: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  compactTitle: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 13,
    marginTop: 6,
  },
  compactAuthor: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 12,
    color: "#858585",
    marginTop: 2,
  },
});
