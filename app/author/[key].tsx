import { router, useLocalSearchParams } from "expo-router";
import { useAuthorDetail } from "@/hooks/openLibraryApi";
import Author from "@/types/authorProps";
import { View, StyleSheet } from "react-native";
import Header from "@/components/Header";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";
import { useSearchStore } from "@/store/searchStore";

export default function AuthorDetails() {
  const { key } = useLocalSearchParams();
  console.log(key);
  const { data: author, isLoading, isError } = useAuthorDetail(key as string);
  const searchByAuthor = useSearchStore((state) => state.searchByAuthor);
  const handleAuthorSearch = () => {
    const name = author?.name ?? "";
    if (!author) return;
    searchByAuthor(name);
    router.push({ pathname: "/searchResults" });
  };

  const getBio = (bio: Author["bio"]): string | null => {
    if (!bio) return null;
    if (typeof bio === "string") return bio;
    return bio.value;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          accessibilityLabel="Loading"
          accessibilityRole="progressbar"
        />
      </View>
    );
  }
  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error loading author</Text>
      </View>
    );
  }
  if (!author)
    return (
      <View style={styles.container}>
        <Text>Author not found.</Text>
      </View>
    );

  return (
    <>
      <Header title={author.name} />
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.info}>
              <Card.Title
                title={author.name}
                titleStyle={styles.title}
                subtitle={
                  author.ratings_average &&
                  `Average Rating: ${author.ratings_average}`
                }
              />
              <Card.Content>
                {author.birth_date && author.death_date && (
                  <Text style={styles.lifespan}>
                    {author.birth_date} - {author.death_date}
                  </Text>
                )}
                {author.work_count && <Text>Works: {author.work_count}</Text>}
                {author.top_work && <Text>Top Work: {author.top_work}</Text>}
                <View>
                  {getBio(author.bio) && <Text>{getBio(author.bio)}</Text>}
                </View>

                <View style={styles.authorSearchButton}>
                  <Button
                    mode="contained"
                    onPress={handleAuthorSearch}
                    accessibilityLabel="Search by author"
                    style={styles.worksButton}
                  >
                    Works by {author.name ?? "this author"}
                  </Button>
                </View>
              </Card.Content>
            </View>
          </View>
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: { marginBottom: 8, marginHorizontal: 16 },
  cardContent: { position: "relative" },
  title: { fontWeight: "700" },
  lifespan: { fontWeight: "600", marginBottom: 10 },
  info: { flex: 1 },
  authorSearchButton: { marginTop: 12 },
  worksButton: {
    margin: 20,
  },
});
