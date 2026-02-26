import { Book } from "@/types/bookProps";
import SavedProps from "@/types/savedProps";
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
import { useFavoritesStore } from "../store/favoritesStore";
import { useRouter } from "expo-router";
import { useSearchStore } from "../store/searchStore";
import Header from "./Header";
import {
  ShoppingCart,
  BookOpenText,
  SendHorizonal,
  BookMarked,
} from "lucide-react-native";
import ActionButton from "./ActionButton";

interface BookDetailProps extends SavedProps {
  readonly book: Book;
}

export default function BookDetails({ book }: { book: Book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const { data, isLoading, isError } = useBookDescription(book.key);

  const isSaved = useFavoritesStore((state) =>
    state.favorites.some((f) => f.key === book.key),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
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
    console.log("Add to reading list: ", book.title);
  };
  return (
    <>
      <Header title={book.title} />
      <ScrollView>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.saveButton}>
              <Save isSaved={isSaved} onToggle={() => toggleFavorite(book)} />
            </View>
            <View style={styles.coverBox}>
              {coverUrl ? (
                <Image source={{ uri: coverUrl }} style={styles.cover} />
              ) : (
                <View style={styles.placeholder}>
                  <Text>No cover available.</Text>
                </View>
              )}
            </View>
            <View style={styles.info}>
              <Card.Title title={book.title} titleStyle={styles.title} />
              {book.author_name && (
                <TouchableOpacity onPress={handleAuthorPress}>
                  <Text style={styles.authorName}>
                    {book.author_name.join(", ")}
                  </Text>
                </TouchableOpacity>
              )}
              <Card.Content>
                {book.subject && (
                  <View style={styles.subjects}>
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
                {book.first_publish_year && (
                  <Text>First Published: {book.first_publish_year}</Text>
                )}
                {book.number_of_pages_median && (
                  <Text>Pages: {book.number_of_pages_median}</Text>
                )}
                {book.isbn && <Text>ISBN: {book.isbn[0]}</Text>}
                <View>
                  {isLoading && (
                    <ActivityIndicator
                      accessibilityLabel="Loading results"
                      accessibilityRole="progressbar"
                    />
                  )}
                  {isError && <Text>Description unavailable.</Text>}
                  {data && <Text>{data}</Text>}
                </View>
                {!isLoading && !isError && !data && (
                  <Text>No description available.</Text>
                )}
                <View style={styles.actionContainer}>
                  <ActionButton
                    icon={ShoppingCart}
                    label="Buy"
                    onPress={handleBuy}
                  />
                  <ActionButton
                    icon={BookOpenText}
                    label="Loan"
                    onPress={handleLoan}
                  />
                  <ActionButton
                    icon={BookMarked}
                    label="Add to Reading List"
                    onPress={handleReadingList}
                  />
                  <ActionButton
                    icon={SendHorizonal}
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
                  >
                    Works by {book.author_name?.[0] ?? "this author"}
                  </Button>
                </View>
              </Card.Content>
            </View>
          </View>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "white",
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
    borderRadius: 10,
  },
  placeholder: {
    width: 160,
    height: 240,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  title: { fontWeight: "700", fontSize: 25 },
  info: { flex: 1 },
  authorSearchButton: { marginTop: 12 },
  authorName: {
    paddingHorizontal: 16,
    color: "#858585",
    fontSize: 15,
  },
  worksButton: {
    margin: 20,
    backgroundColor: "#fa6b47",
  },
  subjects: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 999,
    backgroundColor: "#f8b197",
  },
  chipText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
