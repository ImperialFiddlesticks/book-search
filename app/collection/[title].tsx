import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useCollectionsStore } from "../../store/collectionsStore";
import CollectionBookItem from "../../components/CollectionBookItem";
import Header from "../../components/Header";

export default function CollectionPage() {
  const { title } = useLocalSearchParams<{ title: string }>();
  const collection = useCollectionsStore((state) =>
    state.collections.find((c) => c.title === title)
  );

  const books = collection?.books ?? [];

  return (
    <>
      <Header title="Collection" />
      <Text style={styles.collectionTitle}>{title}</Text>

      {books.length === 0 ? (
        <Text style={styles.empty}>No books in this collection yet.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          numColumns={3}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <CollectionBookItem book={item} />}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  collectionTitle: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
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
});
