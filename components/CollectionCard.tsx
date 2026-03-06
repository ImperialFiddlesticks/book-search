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
  readonly onMenuPress?: () => void;
}

export default function CollectionCard({
  collection,
  onPress,
  onMenuPress,
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
      <View style={styles.menuContainer}>
      <IconButton
        icon="dots-vertical"
        style={styles.menuButton}
        onPress={onMenuPress}
        accessibilityLabel="Collection options"
      />
      </View>
      <Card.Content>
        {/* Preview Grid */}
        <View style={styles.previewContainer}>
          {collection.savedItems.slice(0, 4).map(({ cover_i, key }: Book) => (
            <View key={key} style={styles.previewImageWrapper}>
              <Image
                source={{
                  uri: cover_i
                    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
                    : undefined,
                }}
                style={styles.previewImage}
                accessibilityElementsHidden={true}
                importantForAccessibility="no-hide-descendants"
              />
            </View>
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
    position: "relative",
  },

  menuContainer: {
    padding: 4,
    display: "flex",
    alignItems: "flex-end"
  },

  
  menuButton: {

  },
  previewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  previewImageWrapper: {
    width: "48%",
    aspectRatio: 1,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
});
