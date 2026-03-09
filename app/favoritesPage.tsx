import CollectionCard from "../components/CollectionCard";
import { StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import NewCollectionModal from "../components/NewCollectionModal";
import { useCollectionsStore } from "../store/collectionsStore";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
  const collections = useCollectionsStore((state) => state.collections);
  const allFavBooks = useCollectionsStore((state) =>
    state.collections.find((c) => c.title === "All favorites")?.books ?? [],
  );
  const router = useRouter();

  return (
    <ScrollView
      style={{ position: "relative" }}
      keyboardShouldPersistTaps='always'
    >
      <Header title='Collections' />
      <View style={styles.titleRow}>
        <Text style={styles.pageTitle}>Collections</Text>
        <NewCollectionModal
          renderTrigger={(openModal) => (
            <Pressable onPress={openModal}>
              <Text style={styles.newCollectionBtn}>+ New</Text>
            </Pressable>
          )}
        />
      </View>
      {collections.map((c) => (
        <CollectionCard
          key={c.title}
          collection={{
            savedItems: c.books.filter((b) => allFavBooks.some((f) => f.key === b.key)),
            title: c.title,
          }}
          onPress={() =>
            router.push(`/collection/${encodeURIComponent(c.title)}`)
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pageTitle: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 22,
  },
  newCollectionBtn: {
    color: "#fa6b47",
    fontWeight: "600",
    fontSize: 16,
  },
});
