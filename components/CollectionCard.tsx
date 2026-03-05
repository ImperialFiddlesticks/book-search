import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
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
  return (
    <Card
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${collection.title}, ${collection.savedItems.length} items`}
      accessibilityHint="Opens collection"
    >
      <Card.Content>
        {/* Preview Grid */}
        <View style={styles.previewContainer}>
          {collection.savedItems.slice(0, 4).map(({ cover_i, key }: Book) => (
            <Image
              key={key}
              source={{
                uri: cover_i
                  ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
                  : undefined,
              }}
              style={styles.previewImage}
              accessibilityElementsHidden={true}
              importantForAccessibility="no-hide-descendants"
            />
          ))}
        </View>

        {/* Title + Count */}
        <View style={styles.footer}>
          <View
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants"
          >
            <Text variant="titleMedium">{collection.title}</Text>
            <Text variant="bodySmall">
              {collection.savedItems.length} items
            </Text>
          </View>
          <IconButton
            icon="chevron-right"
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
    margin: 12,
    borderRadius: 16,
  },
  previewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  previewImage: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
});
