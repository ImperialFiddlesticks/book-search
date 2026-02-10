import { StyleSheet, Text, View } from "react-native";

export default function SearchResults() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
