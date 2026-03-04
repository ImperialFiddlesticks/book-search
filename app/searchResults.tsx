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
import { useSearchStore } from "../store/searchStore";
import { useBookSearch } from "../hooks/openLibraryApi";
import SubjectChips from "@/components/Subjects";
import Header from "../components/Header";
import { Button } from "react-native-paper";
import Sorting, { SortOption } from "@/components/Sorting";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const pageSize = 10;

export default function SearchResults() {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(1);
  const { searchMode, authorName, resetToBooks } = useSearchStore();
  const { query } = useLocalSearchParams<{ query: string }>();
  const [selectedSubjects, setselectedSubjects] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<SortOption>("Relevance");

  const [searchQuery, setSearchQuery] = useState(query || "");
  const activeQuery =
    searchMode === "author" ? `author:${authorName}` : searchQuery;
  const { data, isLoading, isError } = useBookSearch(
    activeQuery || "",
    selectedSubjects,
    currentPage,
    currentSort,
  );
  useEffect(() => {
    return () => resetToBooks();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header title="FOLIO" />
        <SafeAreaView
          style={[styles.container, { paddingBottom: insets.bottom }]}
        >
          <Booksearchbar />
          <SubjectChips
            selectedSubjects={selectedSubjects}
            onSelectSubject={(newSubjects) => {
              setselectedSubjects(newSubjects);
            }}
          />
          <Text style={styles.title}>
            {searchMode === "author"
              ? `Works by ${authorName}`
              : "Search Results"}
          </Text>
          <ActivityIndicator
            size="large"
            color="#f8b197"
            accessibilityLabel="Loading Books"
            accessibilityRole="progressbar"
          />
        </SafeAreaView>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header title="FOLIO" />
        <SafeAreaView
          style={[styles.container, { paddingBottom: insets.bottom }]}
        >
          <Booksearchbar />
          <SubjectChips
            selectedSubjects={selectedSubjects}
            onSelectSubject={(newSubjects) => {
              setselectedSubjects(newSubjects);
            }}
          />
          <Text style={styles.title}>
            {searchMode === "author"
              ? `Works by ${authorName}`
              : "Search Results"}
          </Text>
          <Text>Error loading results. Please try again.</Text>
        </SafeAreaView>
      </>
    );
  }
  return (
    <>
      <Header title="FOLIO" />
      <SafeAreaView style={[styles.container]}>
        <Booksearchbar />
        <SubjectChips
          selectedSubjects={selectedSubjects}
          onSelectSubject={(newSubjects) => {
            setselectedSubjects(newSubjects);
          }}
        />
        <Sorting
          currentSort={currentSort}
          onSortChange={(newSort) => {
            setCurrentSort(newSort);
          }}
        />

        <Text style={styles.title}>
          {searchMode === "author"
            ? `Works by ${authorName}`
            : "Search Results"}
        </Text>
        <FlatList
          data={data?.docs ?? []}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <BookCard book={item} />}
          ListEmptyComponent={<Text>No results found.</Text>}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + 60,
          }}
        />
        <View style={styles.controls}>
          <Button
            onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            labelStyle={styles.controlButton}
          >
            Previous
          </Button>
          <Text style={styles.pageNumber}>Page {currentPage}</Text>
          <Button
            onPress={() => setCurrentPage((p) => p + 1)}
            disabled={data ? currentPage * pageSize >= data.numFound : true}
            labelStyle={styles.controlButton}
          >
            Next
          </Button>
        </View>
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
  title: {
    fontSize: 28,
    fontFamily: "LibreBaskerville_700Bold",
    marginBottom: 16,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    paddingTop: 5,
  },
  controlButton: {
    fontFamily: "SourceSans3_600SemiBold",
    color: "black",
  },
  pageNumber: {
    fontFamily: "SourceSans3_400Regular",
    color: "black",
  },
});
