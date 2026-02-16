import { Book } from "@/app/hooks/useBookSearch";

import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface BookCoverProps {
  readonly book: Book;
  readonly onPress: () => void;
}

export default function BookCover({ book, onPress }: BookCoverProps) {
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
      {isLoading && <ActivityIndicator style={styles.activity} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  coverBox: { height: 120, width: 80, borderRadius: 4 },
  cover: { height: 120, width: 80, borderRadius: 4, resizeMode: "cover" },
  activity: { position: "absolute" },
});
