import React from "react";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useCollectionsStore } from "../../store/collectionsStore";
import CollectionBookComponent from "../../components/CollectionBookComponent";
import Header from "../../components/Header";
import ModalComponent from "../../components/ModalComponent";

export default function CollectionPage() {
  const { title } = useLocalSearchParams<{ title: string }>();
  const collection = useCollectionsStore((state) =>
    state.collections.find((c) => c.title === title)
  );

  const books = collection?.books ?? [];

  return (
    <>
      <Header title="Collection" />
      <View style={styles.titleRow}>
        <Text style={styles.collectionTitle}>{title}</Text>
        <ModalComponent
          text="Collection options"
          submitText=""
          renderTrigger={(openModal) => (
            <Appbar.Action
              icon="dots-vertical"
              onPress={openModal}
              accessibilityLabel="Collection options menu"
            />
          )}
        >
          <Pressable
            style={styles.modalOption}
            accessibilityRole="button"
          >
            <Text style={styles.modalOptionText}>Rename collection</Text>
          </Pressable>
          <Pressable
            style={styles.modalOption}
            accessibilityRole="button"
          >
            <Text style={styles.modalOptionText}>Add to collection</Text>
          </Pressable>
          <Pressable
            style={styles.modalOption}
            accessibilityRole="button"
          >
            <Text style={styles.modalDeleteText}>Delete collection</Text>
          </Pressable>
        </ModalComponent>
      </View>

      {books.length === 0 ? (
        <Text style={styles.empty}>No books in this collection yet.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          numColumns={3}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <CollectionBookComponent book={item} />}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  collectionTitle: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 22,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#858585",
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
  },
  grid: {
    paddingHorizontal: 12,
  },
  row: {
    justifyContent: "flex-start",
    gap: 4,
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fa6b47",
  },
  modalDeleteText: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
});
