import { Book } from "@/types/bookProps";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSelectedBookStore } from "@/store/useSelectedBookStore";

export default function CollectionBookComponent({
  book,
}: {
  readonly book: Book;
}) {
  const router = useRouter();
  const { setSelectedBook } = useSelectedBookStore();

  const handlePress = () => {
    setSelectedBook(book);
    router.push("/details");
  };

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <Card elevation={0} style={styles.card} onPress={handlePress}>
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No cover</Text>
        </View>
      )}
      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
      {book.author_name && (
        <Text style={styles.author} numberOfLines={1}>
          {book.author_name.join(", ")}
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    width: 120,
    padding: 4,
  },
  cover: {
    width: 112,
    height: 160,
    borderRadius: 4,
  },
  placeholder: {
    width: 112,
    height: 160,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 10,
    color: "#888",
    fontFamily: "SourceSans3_400Regular",
  },
  title: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 13,
    marginTop: 6,
  },
  author: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 12,
    color: "#858585",
    marginTop: 2,
  },
});
