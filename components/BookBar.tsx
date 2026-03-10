import { Book } from "@/types/bookProps";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BookCover from "./BookCover";

interface SavedBooksProps {
  readonly books: Book[];
  readonly title: string;
  readonly onBookPress: (book: Book) => void;
  readonly onLongPress?: (book: Book) => void;
  readonly emptyMessage?: string;
  readonly onTitlePress?: () => void;
}

export default function BookBar({
  books,
  title,
  onBookPress,
  onLongPress,
  emptyMessage = "No books yet...",
  onTitlePress,
}: SavedBooksProps) {
  return (
    <View style={styles.listWrapper}>
      {onTitlePress ? (
        <TouchableOpacity
          onPress={onTitlePress}
          accessibilityRole="link"
          accessibilityLabel={`Go to ${title}`}
          style={{ alignSelf: "flex-start" }}
        >
          <Text style={styles.listHeadline} accessibilityRole="header">
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.listHeadline} accessibilityRole="header">
          {title}
        </Text>
      )}
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BookCover
            book={item}
            onPress={() => onBookPress(item)}
            onLongPress={onLongPress ? () => onLongPress(item) : undefined}
            listPosition={`${index + 1} of ${books.length}`}
          />
        )}
        keyExtractor={(item) => String(item.key)}
        contentContainerStyle={styles.contentContainer}
        style={styles.list}
        ListEmptyComponent={
          <Text accessibilityLiveRegion="polite">{emptyMessage}</Text>
        }
        accessibilityLabel={`${title} list, ${books.length} books`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 6,
    paddingHorizontal: 1,
    gap: 8,
    alignItems: "center",
  },

  listWrapper: { paddingVertical: 20, height: 200, width: "100%" },
  listHeadline: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 18,
    marginBottom: 10,
  },
  list: { flexGrow: 0 },
});
