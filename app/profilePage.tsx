import CollectionCard from "../components/CollectionCard";
import { StyleSheet, View, ScrollView, Pressable, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import NewCollectionModal from "../components/NewCollectionModal";
import { useCollectionsStore } from "../store/collectionsStore";
import { useReadingListStore } from "../store/readingListStore";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Book } from "@/types/bookProps";
import BookCard from "../components/BookCard";
import Carousel from "../components/Carousel";

const CARD_GAP = 8;
const HORIZONTAL_PADDING = 16;
const MAX_CAROUSEL_ITEMS = 5;
const MAX_READING_LIST_ITEMS = 10;

export default function ProfileScreen() {
  const collections = useCollectionsStore((state) => state.collections);
  const allFavBooks = useCollectionsStore((state) =>
    state.collections.find((c) => c.title === "All favorites")?.books ?? [],
  );
  const readingList = useReadingListStore((state) => state.readingList);
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  const cardWidth = (screenWidth - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

  const visibleCollections = collections.slice(0, MAX_CAROUSEL_ITEMS);
  const visibleReadingList = readingList.slice(0, MAX_READING_LIST_ITEMS);

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Header />
    <ScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps='always'
    >

      {/* Collections Section */}
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>Collections</Text>
        <NewCollectionModal
          renderTrigger={(openModal) => (
            <Pressable onPress={openModal}>
              <Text style={styles.newCollectionBtn}>+ New</Text>
            </Pressable>
          )}
        />
      </View>

      <Carousel itemWidth={cardWidth}>
        {visibleCollections.map((item) => (
          <View key={item.title} style={{ width: cardWidth, marginRight: CARD_GAP }}>
            <CollectionCard
              collection={{
                savedItems: item.books.filter((b: Book) => allFavBooks.some((f) => f.key === b.key)),
                title: item.title,
              }}
              onPress={() =>
                router.push(`/collection/${encodeURIComponent(item.title)}`)
              }
            />
          </View>
        ))}
        <View key="__go_to_collections__" style={{ width: cardWidth, marginRight: CARD_GAP }}>
          <Pressable
            style={styles.goToAllCard}
            onPress={() => router.push("/collectionsPage")}
          >
            <Text style={styles.goToAllText}>Go to all collections</Text>
          </Pressable>
        </View>
      </Carousel>

      <Pressable
        style={styles.goToAllLink}
        onPress={() => router.push("/collectionsPage")}
      >
        <Text style={styles.goToAllLinkText}>Go to all collections <MaterialCommunityIcons name="chevron-right" size={16} color="#fa6b47" /></Text>
      </Pressable>

      {/* Reading List Section */}
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>Reading list</Text>
      </View>

      <Carousel itemWidth={120}>
        {visibleReadingList.map((book) => (
          <View key={book.key} style={{ width: 120, marginRight: CARD_GAP }}>
            <BookCard book={book} showTitle showAuthor hideSave />
          </View>
        ))}
        <View key="__go_to_reading_list__" style={{ width: 120, marginRight: CARD_GAP }}>
          <Pressable
            style={styles.rlGoToAllCard}
            onPress={() => router.push("/readingListPage")}
          >
            <Text style={styles.goToAllText}>Go to Reading list</Text>
          </Pressable>
        </View>
      </Carousel>

      <Pressable
        style={styles.goToAllLink}
        onPress={() => router.push("/readingListPage")}
      >
        <Text style={styles.goToAllLinkText}>Go to Reading list <MaterialCommunityIcons name="chevron-right" size={16} color="#fa6b47" /></Text>
      </Pressable>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 22,
  },
  newCollectionBtn: {
    color: "#fa6b47",
    fontWeight: "600",
    fontSize: 16,
  },
  goToAllCard: {
    flex: 1,
    backgroundColor: "hsla(0, 0%, 0%, 0.05)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  rlGoToAllCard: {
    height: 200,
    backgroundColor: "hsla(0, 0%, 0%, 0.05)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  goToAllText: {
    color: "#333333",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  goToAllLink: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: HORIZONTAL_PADDING,
    marginBottom: 24,
  },
  goToAllLinkText: {
    color: "#fa6b47",
    fontWeight: "600",
    fontSize: 16,
  },
});
