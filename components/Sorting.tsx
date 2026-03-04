import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";

export type SortOption =
  | "Relevance"
  | "title"
  | "new"
  | "old"
  | "rating desc"
  | "rating asc";

interface SortingProps {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

export default function Sorting({ currentSort, onSortChange }: SortingProps) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (option: SortOption) => {
    onSortChange(option);
    closeMenu();
  };

  const getSortLabel = () => {
    switch (currentSort) {
      case "new":
        return "Newest";
      case "old":
        return "Oldest";
      case "rating desc":
        return "Rating (High to Low)";
      case "rating asc":
        return "Rating (Low to High)";
      case "title":
        return "Title";
      default:
        return "Relevance";
    }
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button mode="outlined" onPress={openMenu}>
            Sort by: {getSortLabel()}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            handleSelect("Relevance");
          }}
          title="Relevance"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            handleSelect("new");
          }}
          title="Newest"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("old");
          }}
          title="Oldest"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            handleSelect("rating desc");
          }}
          title="Rating (High to Low)"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("rating asc");
          }}
          title="Rating (Low to High)"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            handleSelect("title");
          }}
          title="Title (A-Z)"
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
