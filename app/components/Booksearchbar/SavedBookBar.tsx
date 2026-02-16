import { Book } from "@/app/types/bookProps";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import BookCover from "./BookCover";

interface SavedBooksProps {
  readonly books: Book[];
  readonly onBookPress: (book: Book) => void;
  readonly isSaved: (book: Book) => boolean;
  readonly onToggle: (book: Book) => void;
}

export default function SavedBookBar({
  books,
  onBookPress,
  isSaved,
  onToggle,
}: SavedBooksProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={styles.listWrapper}>
      <Text style={styles.listHeadline}>Saved Books</Text>
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookCover
            book={item}
            onPress={() => onBookPress(item)}
            isSaved={isSaved(item)}
            onToggle={() => onToggle(item)}
          />
        )}
        keyExtractor={(item) => String(item.key)}
        contentContainerStyle={styles.contentContainer}
        style={{ height: isLandscape ? 200 : 150, width: "100%" }}
        ListEmptyComponent={<Text>No saved books yet...</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 16, gap: 8, alignItems: "center" },

  listWrapper: { paddingVertical: 10 },
  listHeadline: { fontWeight: "600" },
});
