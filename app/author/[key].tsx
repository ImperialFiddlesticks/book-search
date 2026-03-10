import { router, useLocalSearchParams } from "expo-router";
import { useAuthorDetail } from "@/hooks/openLibraryApi";
import Author from "@/types/authorProps";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import Header from "@/components/Header";
import { Card, Text, Button, ActivityIndicator } from "react-native-paper";
import { useSearchStore } from "@/store/searchStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthorDetails() {
  const { key } = useLocalSearchParams();
  console.log(key);
  const { data: author, isLoading, isError } = useAuthorDetail(key as string);
  const searchByAuthor = useSearchStore((state) => state.searchByAuthor);

  const authorUrl = key
    ? `https://covers.openlibrary.org/a/olid/${key}-M.jpg`
    : null;
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
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          accessibilityLabel="Loading"
          accessibilityRole="progressbar"
          accessibilityLiveRegion="polite"
        />
      </SafeAreaView>
    );
  }
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text accessibilityRole="alert">Error loading author</Text>
      </SafeAreaView>
    );
  }
  if (!author)
    return (
      <SafeAreaView style={styles.container}>
        <Text accessibilityRole="alert">Author not found.</Text>
      </SafeAreaView>
    );

  return (
    <>
      <Header title="FOLIO" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Card style={styles.card} elevation={0}>
            <View style={styles.cardContent}>
              <View style={styles.photoBox}>
                {authorUrl ? (
                  <Image
                    source={{ uri: authorUrl }}
                    style={styles.photo}
                    accessibilityLabel={`Photo of ${author.name}`}
                  />
                ) : (
                  <View
                    style={styles.placeholder}
                    accessibilityLabel={`No photo available for ${author.name}`}
                  >
                    <Text>No photo available.</Text>
                  </View>
                )}
              </View>
              <View style={styles.info}>
                <Card.Title
                  title={author.name}
                  titleStyle={styles.title}
                  accessibilityRole="header"
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
                  {author.work_count && (
                    <Text style={styles.extraInfo}>
                      Works: {author.work_count}
                    </Text>
                  )}
                  {author.top_work && (
                    <Text style={styles.extraInfo}>
                      Top Work: {author.top_work}
                    </Text>
                  )}
                  <View>
                    {getBio(author.bio) && (
                      <Text style={styles.bio}>{getBio(author.bio)}</Text>
                    )}
                  </View>

                  <View style={styles.authorSearchButton}>
                    <Button
                      mode="contained"
                      onPress={handleAuthorSearch}
                      accessibilityLabel={`Search works by ${author.name ?? "this author"}`}
                      accessibilityHint="Opens search results for this author"
                      style={styles.worksButton}
                      labelStyle={{
                        fontFamily: "SourceSans3_600SemiBold",
                        fontSize: 15,
                      }}
                    >
                      Works by {author.name ?? "this author"}
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
    padding: 16,
  },
  card: {
    marginBottom: 8,
    marginHorizontal: 16,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  cardContent: { position: "relative" },
  photoBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  photo: {
    height: 240,
    width: 160,
    borderRadius: 4,
  },
  placeholder: {
    width: 160,
    height: 240,
    borderRadius: 4,
    backgroundColor: "hsla(0, 0%, 0%, 0.15)",
  },
  title: { fontSize: 25, fontFamily: "LibreBaskerville_700Bold" },
  lifespan: { fontFamily: "SourceSans3_600SemiBold", marginBottom: 10 },
  info: {
    flex: 1,
    marginTop: 10,
  },
  extraInfo: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 20,
    color: "#000000cc",
    fontFamily: "SourceSans3_400Regular",
  },
  bio: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "SourceSans3_400Regular",
  },
  authorSearchButton: { marginTop: 12 },
  worksButton: {
    margin: 20,
    backgroundColor: "#fa6b47",
    borderRadius: 4,
  },
});
