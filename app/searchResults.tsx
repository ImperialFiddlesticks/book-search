import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BookCard from "../components/BookCard";
import Booksearchbar from "../components/Booksearchbar";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import { useSearchStore } from "../store/searchStore";
import { useBookSearch } from "../hooks/openLibraryApi";
import SubjectChips from "@/components/Subjects";

export default function SearchResults() {
  const { searchMode, authorName, resetToBooks } = useSearchStore();
  const { query } = useLocalSearchParams<{ query: string }>();
  const [selectedSubjects, setselectedSubjects] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState(query || "");
  const activeQuery =
    searchMode === "author" ? `author:${authorName}` : searchQuery;
  const { data, isLoading, isError } = useBookSearch(
    activeQuery || "",
    selectedSubjects,
  );
  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);

  useEffect(() => {
    loadFavorites();
    return () => resetToBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Booksearchbar />
      <SubjectChips
        selectedSubjects={selectedSubjects}
        onSelectSubject={(newSubjects) => {
          setselectedSubjects(newSubjects);
        }}
      />
      <Text style={styles.title}>
        {searchMode === "author" ? `Works by ${authorName}` : "Search Results"}
      </Text>
      <FlatList
        data={data?.docs ?? []}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <BookCard book={item} />}
        ListEmptyComponent={<Text>No results found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    overflow: "visible",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
