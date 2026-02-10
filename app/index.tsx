import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.constainer}>
      <Text style={styles.title}>Home Screen</Text>
      <Link href="/searchResults">
        <Text style={styles.link}>Search Results</Text>
      </Link>
      <Link href="/details">
        <Text style={styles.link}>Book Details</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
    alignItems: "center",
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
});
