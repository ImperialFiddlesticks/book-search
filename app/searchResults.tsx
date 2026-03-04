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
import { Button }, { SortOption } from "react-native-paper";
import Sorting, Language, { LanguageOption } from "@/components/Language";
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
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>("All");
  const [currentSort, setCurrentSort] = useState<SortOption>("Relevance");

  const [searchQuery, setSearchQuery] = useState(query || "");
  const activeQuery =
    searchMode === "author" ? `author:${authorName}` : searchQuery;
  const { data, isLoading, isError } = useBookSearch(
    activeQuery || "",
    selectedSubjects,
    currentPage,
    currentSort,
    currentLanguage,
  );
  useEffect(() => {
    return () => resetToBooks();
  }, []);

  if (isLoading) {
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
          <Text style={styles.title} accessibilityRole="header">
            {searchMode === "author"
              ? `Works by ${authorName}`
              : "Search Results"}
          </Text>
          <ActivityIndicator
            size="large"
            color="#f8b197"
            accessibilityLabel="Loading Books, please wait"
            accessibilityRole="progressbar"
            accessibilityLiveRegion="polite"
          />
        </SafeAreaView>
      </>
    );
  }

  if (isError) {
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
          <Text style={styles.title}>
            {searchMode === "author"
              ? `Works by ${authorName}`
              : "Search Results"}
          </Text>
          <Text accessibilityLiveRegion="assertive" accessibilityRole="alert">
            Error loading results. Please try again.
          </Text>
        </SafeAreaView>
      </>
    );
  }
  return (
    <>
      <Header title="FOLIO" />
      <SafeAreaView style={[styles.container]} edges={["bottom"]}>
        <Booksearchbar />
        <SubjectChips
          selectedSubjects={selectedSubjects}
          onSelectSubject={(newSubjects) => {
            setselectedSubjects(newSubjects);
          }}
        />
        <View style={styles.filterRow}>
          <Sorting
            currentSort={currentSort}
            onSortChange={(newSort) => {
              setCurrentSort(newSort);
            }}
          />
          <Language
            currentLanguage={currentLanguage}
            onLanguageChange={(newLanguage) => {
              setCurrentLanguage(newLanguage);
            }}
          />
        </View>

        <Text style={styles.title} accessibilityRole="header">
          {searchMode === "author"
            ? `Works by ${authorName}`
            : "Search Results"}
        </Text>
        <FlatList
          data={data?.docs ?? []}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <BookCard book={item} />}
          ListEmptyComponent={
            <Text accessibilityRole="alert">No results found.</Text>
          }
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + 60,
          }}
          accessibilityLabel="Search result list"
        />
        <View style={styles.controls}>
          <Button
            onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            labelStyle={styles.controlButton}
            accessibilityLabel={`Previous page, currently on page ${currentPage}`}
          >
            Previous
          </Button>
          <Text
            style={styles.pageNumber}
            accessibilityLabel={`Page ${currentPage}`}
          >
            Page {currentPage}
          </Text>
          <Button
            onPress={() => setCurrentPage((p) => p + 1)}
            disabled={data ? currentPage * pageSize >= data.numFound : true}
            labelStyle={styles.controlButton}
            accessibilityLabel={`Next page, currently on page ${currentPage}`}
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
  filterRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 8,
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
