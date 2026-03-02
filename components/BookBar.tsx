import { Book } from "@/types/bookProps";
import { FlatList, StyleSheet, Text, View } from "react-native";
import BookCover from "./BookCover";

interface SavedBooksProps {
  readonly books: Book[];
  readonly title: string;
  readonly onBookPress: (book: Book) => void;
  readonly onLongPress?: (book: Book) => void;
  readonly isSaved: (book: Book) => boolean;
  readonly onToggle: (book: Book) => void;
  readonly emptyMessage?: string;
}

export default function BookBar({
  books,
  title,
  onBookPress,
  onLongPress,
  isSaved,
  onToggle,
  emptyMessage = "No books yet...",
}: SavedBooksProps) {
  return (
    <View style={styles.listWrapper}>
      <Text style={styles.listHeadline}>{title}</Text>
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
            onLongPress={onLongPress ? () => onLongPress(item) : undefined}
          />
        )}
        keyExtractor={(item) => String(item.key)}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        ListEmptyComponent={<Text>{emptyMessage}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 16, gap: 8, alignItems: "center" },

  listWrapper: { paddingVertical: 10, height: 180 },
  listHeadline: { fontWeight: "600" },
  list: { flexGrow: 0 },
});
