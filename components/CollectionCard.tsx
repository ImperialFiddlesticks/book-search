import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Text, IconButton, useTheme } from "react-native-paper";
import { Book } from "../types/bookProps";

interface CollectionCardProps {
  readonly collection: {
    savedItems: Book[];
    title: string;
  };
  readonly onPress?: () => void;
}

export default function CollectionCard({
  collection,
  onPress,
}: CollectionCardProps) {
  const theme = useTheme();

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${collection.title}, ${collection.savedItems.length} items`}
      accessibilityHint="Opens collection"
      elevation={0}
    >
      <Card.Content>
        {/* Preview Grid */}
        {[0, 2].map((rowStart) => (
          <View key={rowStart} style={styles.previewRow}>
            {[rowStart, rowStart + 1].map((i) => {
              const book = collection.savedItems[i];
              return (
                <View key={book?.key ?? `empty-${i}`} style={[styles.previewCell, !book && styles.placeholder]}>
                  {book && (
                    <Image
                      source={{
                        uri: book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                          : undefined,
                      }}
                      style={styles.previewImage}
                      alt={book.title ? `Cover of ${book.title}` : "Book cover"}
                      accessibilityElementsHidden={true}
                      importantForAccessibility="no-hide-descendants"
                    />
                  )}
                </View>
              );
            })}
          </View>
        ))}

        {/* Title + Count */}
        <View style={styles.footer}>
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium">{collection.title}</Text>
            <Text variant="bodySmall">
              {collection.savedItems.length} items
            </Text>
          </View>
          <IconButton
            icon="chevron-right"
            size={16}
            style={{ margin: 0, marginBottom: -8 }}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants"
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
  },
  previewRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 4,
  },
  previewCell: {
    flex: 1,
    aspectRatio: 3 / 4,
    overflow: "hidden",
    borderRadius: 8,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    borderWidth: 2,
    borderColor: "#c0c0c0",
    backgroundColor: "#e8e8e4",
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 8,
  },
});
