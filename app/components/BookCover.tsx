import { Book } from "@/app/types/bookProps";
import SavedProps from "@/app/types/savedProps";

import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Save from "./Save";

interface BookCoverProps extends SavedProps {
  readonly book: Book;
  readonly onPress: () => void;
}

export default function BookCover({
  book,
  onPress,
  isSaved,
  onToggle,
}: BookCoverProps) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const [isLoading, setIsLoading] = useState(!!coverUrl);

  return (
    <Pressable onPress={onPress} style={styles.coverBox}>
      {coverUrl ? (
        <Image
          source={{ uri: coverUrl }}
          style={styles.cover}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      ) : (
        <View style={styles.cover}>
          <Text>{book.title}</Text>
        </View>
      )}
      <View style={styles.saveButton}>
        <Save isSaved={isSaved} onToggle={onToggle} />
      </View>
      {isLoading && <ActivityIndicator style={styles.activity} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  coverBox: { height: 120, width: 80, borderRadius: 4, position: "relative" },
  cover: { height: 120, width: 80, borderRadius: 4, resizeMode: "cover" },
  activity: { position: "absolute" },
  saveButton: { position: "absolute", top: 4, right: 4 },
});
