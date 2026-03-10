import { Book } from "@/types/bookProps";
import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
} from "react-native";
import { Card, Text, Button, Chip } from "react-native-paper";
import Save from "./Save";
import { useBookDescription } from "@/hooks/openLibraryApi";
import { useCollectionsStore } from "@/store/collectionsStore";
import { useReadingListStore } from "@/store/readingListStore";
import { useRouter } from "expo-router";
import { useSearchStore } from "../store/searchStore";
import Header from "./Header";
import ActionButton from "./ActionButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import SavedProps from "@/types/savedProps";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface BookDetailProps extends SavedProps {
  readonly book: Book;
}

export default function BookDetails({ book }: { readonly book: Book }) {
  const insets = useSafeAreaInsets();
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const { data, isLoading, isError } = useBookDescription(book.key);

  const isSaved = useCollectionsStore((state) => state.isSaved(book));
  const { toggleFavorite } = useCollectionsStore();
  const toggleReadingList = useReadingListStore(
    (state) => state.toggleReadingList,
  );
  const isOnReadingList = useReadingListStore((state) =>
    state.readingList.some((b) => b.key === book.key),
  );
  const router = useRouter();
  const searchByAuthor = useSearchStore((state) => state.searchByAuthor);
  const handleAuthorSearch = () => {
    const author = book.author_name?.[0] ?? "";
    if (!author) return;
    searchByAuthor(author);
    router.push({ pathname: "/searchResults" });
  };
  const handleAuthorPress = () => {
    const key = book.author_key?.[0];
    if (key) router.push(`/author/${key}`);
  };

  const handleBuy = async () => {
    try {
      await Linking.openURL(
        `https://www.amazon.com/s?k=${encodeURIComponent(book.title)}`,
      );
    } catch (error) {
      console.error("Failed to open URL", error);
    }
  };

  const handleLoan = async () => {
    try {
      await Linking.openURL(`https://openlibrary.org${book.key}`);
    } catch (error) {
      console.error("Failed to open URL", error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${book.title}: : https://openlibrary.org${book.key}`,
      });
    } catch (error) {
      console.error("Failed to share book", error);
    }
  };

  const handleReadingList = () => {
    toggleReadingList(book);
  };
  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card elevation={0} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.saveButton}>
                <Save isSaved={isSaved} onToggle={() => toggleFavorite(book)} />
              </View>
              <View style={styles.coverBox}>
                {coverUrl ? (
                  <Image source={{ uri: coverUrl }} style={styles.cover} />
                ) : (
                  <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>
                      No cover available.
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.info}>
                <Card.Title title={book.title} titleStyle={styles.title} />
                {book.author_name && (
                  <TouchableOpacity
                    onPress={handleAuthorPress}
                    accessibilityRole="link"
                    accessibilityLabel={`View author ${book.author_name.join(", ")}`}
                  >
                    <Text style={styles.authorName} accessibilityRole="header">
                      {book.author_name.join(", ")}
                    </Text>
                  </TouchableOpacity>
                )}
                <Card.Content>
                  {book.subject && (
                    <View
                      style={styles.subjects}
                      accessibilityLabel="Book subjects"
                      accessibilityRole="list"
                    >
                      {book.subject?.slice(0, 5).map((sub) => (
                        <Chip
                          key={sub}
                          style={styles.chip}
                          textStyle={styles.chipText}
                        >
                          {sub}
                        </Chip>
                      ))}
                    </View>
                  )}

                  <View>
                    {isLoading && (
                      <ActivityIndicator
                        accessibilityLabel="Loading results"
                        accessibilityRole="progressbar"
                        accessibilityLiveRegion="polite"
                      />
                    )}
                    {isError && (
                      <Text
                        style={styles.description}
                        accessibilityRole="alert"
                      >
                        Description unavailable.
                      </Text>
                    )}
                    {data && <Text style={styles.description}>{data}</Text>}
                  </View>
                  {!isLoading && !isError && !data && (
                    <Text style={styles.description} accessibilityRole="alert">
                      No description available.
                    </Text>
                  )}
                  {book.first_publish_year && (
                    <Text style={styles.year}>
                      First Published: {book.first_publish_year}
                    </Text>
                  )}
                  {book.number_of_pages_median && (
                    <Text style={styles.pages}>
                      Pages: {book.number_of_pages_median}
                    </Text>
                  )}
                  {book.isbn && (
                    <Text style={styles.isbn}>ISBN: {book.isbn[0]}</Text>
                  )}
                  <View style={styles.actionContainer}>
                    <ActionButton
                      icon={({ size, color }) => (
                        <FontAwesome
                          name="shopping-cart"
                          size={size}
                          color={color}
                        />
                      )}
                      label="Buy"
                      onPress={handleBuy}
                      accessibilityRole="link"
                    />
                    <ActionButton
                      icon={({ size, color }) => (
                        <Ionicons name="book" size={size} color={color} />
                      )}
                      label="Loan"
                      onPress={handleLoan}
                      accessibilityRole="link"
                    />
                    <ActionButton
                      icon={({ size, color }) => (
                        <FontAwesome
                          name={isOnReadingList ? "bookmark" : "bookmark-o"}
                          size={size}
                          color={color}
                        />
                      )}
                      label="Add to Reading List"
                      onPress={handleReadingList}
                      color={isOnReadingList ? "#a45422" : "#fff"}
                      accessibilityRole="togglebutton"
                      accessibilityState={{ checked: isOnReadingList }}
                    />
                    <ActionButton
                      icon={({ size, color }) => (
                        <Ionicons name="send" size={size} color={color} />
                      )}
                      label="Share"
                      onPress={handleShare}
                    />
                  </View>
                  <View style={styles.authorSearchButton}>
                    <Button
                      mode="contained"
                      onPress={handleAuthorSearch}
                      accessibilityLabel="Search by author"
                      style={styles.worksButton}
                      labelStyle={{
                        fontFamily: "SourceSans3_600SemiBold",
                        fontSize: 15,
                      }}
                    >
                      Works by {book.author_name?.[0] ?? "this author"}
                    </Button>
                  </View>
                </Card.Content>
              </View>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    overflow: "visible",
  },
  card: {
    marginBottom: 8,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  cardContent: { position: "relative" },
  saveButton: { position: "absolute", top: 10, right: 10, zIndex: 1 },
  coverBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cover: {
    height: 240,
    width: 160,
    borderRadius: 4,
  },
  placeholder: {
    width: 160,
    height: 240,
    borderRadius: 10,
    backgroundColor: "hsla(0, 0%, 0%, 0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 10,
    color: "#646464",
    textAlign: "center",
    fontFamily: "SourceSans3_400Regular",
  },

  title: { fontSize: 25, fontFamily: "LibreBaskerville_700Bold" },
  info: { flex: 1 },
  authorSearchButton: { marginTop: 12 },
  authorName: {
    paddingHorizontal: 16,
    color: "#000000cc",
    fontSize: 15,
    fontFamily: "LibreBaskerville_700Bold",
  },
  description: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "SourceSans3_400Regular",
  },
  year: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 20,
    color: "#000000cc",
    fontFamily: "SourceSans3_400Regular",
  },
  pages: {
    fontSize: 14,
    marginBottom: 6,

    color: "#000000cc",
    fontFamily: "SourceSans3_400Regular",
  },
  isbn: {
    fontSize: 14,
    marginBottom: 15,

    color: "#000000cc",
    fontFamily: "SourceSans3_400Regular",
  },
  worksButton: {
    marginTop: 10,
    backgroundColor: "#C8703A",
    borderRadius: 4,
  },
  subjects: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 4,
    backgroundColor: "#D4895A",
  },
  chipText: {
    color: "#000000cc",
    fontFamily: "SourceSans3_600SemiBold",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    overflow: "visible",
  },
});
