import { useStore } from "../store/previousSearched";
import { router } from "expo-router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

export default function PreviousSearched() {
  const { previousSearched } = useStore();

  if (previousSearched.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <List.Section title="Previous Searched">
        {previousSearched.map((item, index) => (
          <List.Item
            key={index}
            title={item}
            onPress={() => {
              router.push({
                pathname: "/searchResults",
                params: { query: item },
              });
            }}
            left={(props) => <List.Icon {...props} icon="history" />}
          />
        ))}
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
