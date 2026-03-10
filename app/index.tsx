import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Dimensions } from "react-native";
import Booksearchbar from "../components/Booksearchbar";
import { useCollectionsStore } from "@/store/collectionsStore";
import { Book } from "../types/bookProps";
import { useSelectedBookStore } from "../store/useSelectedBookStore";
import Header from "../components/Header";
import PreviousSearched from "../components/PreviousSearched";
import { useStore } from "../store/previousSearched";
import BookBar from "../components/BookBar";
import { useReadingListStore } from "@/store/readingListStore";
import ScannerButton from "@/components/ScannerButton";

const { width } = Dimensions.get("window");

const EMPTY_BOOKS: Book[] = [];

export default function Home() {
  const router = useRouter();
  const favoriteBooks = useCollectionsStore(
    (state) =>
      state.collections.find((c) => c.title === "All favorites")?.books ??
      EMPTY_BOOKS,
  );

  const { readingList, toggleReadingList, loadReadingList } =
    useReadingListStore();
  const { setSelectedBook } = useSelectedBookStore();
  const { previousSearched, loadPreviousSearched } = useStore();
  useEffect(() => {
    loadPreviousSearched();
    loadReadingList();
  }, []);

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    router.push("/details");
  };
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Header showBackButton={false} />
      <View style={styles.container}>
        <ScrollView
          style={{ width: "100%" }}
          accessibilityLabel="Home screen content"
          accessibilityHint="List of home screen content"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.banner}>
            {/* Decorative background circles */}
            <View style={styles.circleTopRight} />
            <View style={styles.circleBottomLeft} />

            {/* Decorative lines */}
            <View style={styles.lineTop} />
            <View style={styles.lineBottom} />

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.eyebrow}>YOUR READING COMPANION</Text>
              <Text style={styles.headline}>Find Your{"\n"}Next Read.</Text>
              <View style={styles.divider} />
              <Text style={styles.subtext}>Search · Save · Discover</Text>
            </View>

            {/* Decorative book spines */}
            <View style={styles.spines}>
              <View
                style={[
                  styles.spine,
                  { backgroundColor: "#C8703A", height: 80 },
                ]}
              />
              <View
                style={[
                  styles.spine,
                  { backgroundColor: "#D4895A", height: 100 },
                ]}
              />
              <View
                style={[
                  styles.spine,
                  { backgroundColor: "#8C7B65", height: 70 },
                ]}
              />
              <View
                style={[
                  styles.spine,
                  { backgroundColor: "#C8703A", height: 90 },
                ]}
              />
              <View
                style={[
                  styles.spine,
                  { backgroundColor: "#E8C9A0", height: 60 },
                ]}
              />
            </View>
          </View>

          <Booksearchbar
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200);
            }}
          />
          {isFocused && <PreviousSearched />}
          <ScannerButton />
          <BookBar
            title="Favorites"
            emptyMessage="No favorites yet..."
            books={[...favoriteBooks].reverse().slice(0, 10)}
            onBookPress={handleBookPress}
            onTitlePress={() => router.push("/collectionsPage")}
          />
          <BookBar
            title="Reading list"
            emptyMessage="No books in reading list yet..."
            onBookPress={handleBookPress}
            books={readingList}
            onLongPress={(book) => toggleReadingList(book)}
            onTitlePress={() => router.push("/readingListPage")}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 5,
    // alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  link: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  banner: {
    width: "100%",
    height: 180,
    backgroundColor: "#FEFFF3",
    borderBottomWidth: 1,
    borderBottomColor: "#D6CCBA",
    overflow: "hidden",
    position: "relative",
    marginBottom: 15,
  },
  circleTopRight: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "#D6CCBA",
    top: -60,
    right: -40,
  },
  circleBottomLeft: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D6CCBA",
    bottom: -40,
    left: 100,
  },
  lineTop: {
    position: "absolute",
    top: 18,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: "#D6CCBA",
  },
  lineBottom: {
    position: "absolute",
    bottom: 18,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: "#D6CCBA",
  },
  content: {
    position: "absolute",
    left: 24,
    top: 30,
    bottom: 30,
    justifyContent: "center",
  },
  eyebrow: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 9,
    letterSpacing: 2,
    color: "#8C7B65",
    marginBottom: 6,
  },
  headline: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 28,
    color: "#2C2416",
    lineHeight: 34,
  },
  divider: {
    width: 32,
    height: 2,
    backgroundColor: "#C8703A",
    marginVertical: 8,
  },
  subtext: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 12,
    color: "#8C7B65",
    letterSpacing: 1,
  },
  spines: {
    position: "absolute",
    right: 24,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  spine: {
    width: 18,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
