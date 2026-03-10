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
      <List.Section
        accessibilityRole="list"
        accessibilityLabel="List of previous search queries"
      >
        <List.Subheader style={{ paddingHorizontal: 4 }}>
          Previous searched
        </List.Subheader>
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
            accessibilityRole="link"
            accessibilityLabel={`Search again for ${item}`}
            accessibilityHint="Opens search results"
            left={(props) => (
              <View
                accessibilityElementsHidden={true}
                importantForAccessibility="no-hide-descendants"
              >
                <List.Icon
                  {...props}
                  icon="history"
                  style={{ marginLeft: 4, marginRight: 4 }}
                />
              </View>
            )}
          />
        ))}
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
