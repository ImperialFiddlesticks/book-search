import { useRef, useState } from "react";
import CollectionCard from "../components/CollectionCard";
import { StyleSheet, View, ScrollView, Pressable, FlatList, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import NewCollectionModal from "../components/NewCollectionModal";
import { useCollectionsStore } from "../store/collectionsStore";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Book } from "@/types/bookProps";

const CARD_GAP = 8;
const HORIZONTAL_PADDING = 16;
const MAX_CAROUSEL_ITEMS = 5;
const GO_TO_ALL_KEY = "__go_to_all__";

export default function ProfileScreen() {
  const collections = useCollectionsStore((state) => state.collections);
  const allFavBooks = useCollectionsStore((state) =>
    state.collections.find((c) => c.title === "All favorites")?.books ?? [],
  );
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  const cardWidth = (screenWidth - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

  const visibleCollections = collections.slice(0, MAX_CAROUSEL_ITEMS);
  const carouselData = [...visibleCollections, { title: GO_TO_ALL_KEY, books: [] as never[] }];

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageCount = Math.ceil(carouselData.length / 2);

  return (
    <ScrollView
      style={{ flex: 1 }}
      keyboardShouldPersistTaps='always'
    >
      <Header title='Profile' />

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

      <FlatList
        ref={flatListRef}
        data={carouselData}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={cardWidth + CARD_GAP}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDING }}
        onScroll={(e) => {
          const page = Math.round(e.nativeEvent.contentOffset.x / ((cardWidth + CARD_GAP) * 2));
          setCurrentIndex(page);
        }}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width: cardWidth, marginRight: CARD_GAP }}>
            {item.title === GO_TO_ALL_KEY ? (
              <Pressable
                style={styles.goToAllCard}
                onPress={() => router.push("/collectionsPage")}
              >
                <Text style={styles.goToAllText}>Go to all collections</Text>
              </Pressable>
            ) : (
              <CollectionCard
                collection={{
                  savedItems: item.books.filter((b: Book) => allFavBooks.some((f) => f.key === b.key)),
                  title: item.title,
                }}
                onPress={() =>
                  router.push(`/collection/${encodeURIComponent(item.title)}`)
                }
              />
            )}
          </View>
        )}
      />

      {pageCount > 1 && (
        <View style={styles.dots}>
          {Array.from({ length: pageCount }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}

      <Pressable
        style={styles.goToAllLink}
        onPress={() => router.push("/collectionsPage")}
      >
        <Text style={styles.goToAllLinkText}>Go to all collections <MaterialCommunityIcons name="chevron-right" size={16} color="#fa6b47" /></Text>
      </Pressable>
    </ScrollView>
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
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  dotActive: {
    backgroundColor: "#fa6b47",
  },
  goToAllCard: {
    flex: 1,
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
    marginBottom: 24,
  },
  goToAllLinkText: {
    color: "#fa6b47",
    fontWeight: "600",
    fontSize: 16,
  },
});
