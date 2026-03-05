import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Divider, useTheme } from "react-native-paper";

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
  const theme = useTheme();
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
        contentStyle={{ backgroundColor: theme.colors.secondary }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            accessibilityLabel={`Sort by ${getSortLabel()}`}
            accessibilityHint="Opens sorting options"
            accessibilityState={{ expanded: visible }}
          >
            Sort by: {getSortLabel()}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            handleSelect("Relevance");
          }}
          style={{
            backgroundColor:
              currentSort === "Relevance" ? theme.colors.tertiary : undefined,
          }}
          title="Relevance"
          accessibilityState={{ selected: currentSort === "Relevance" }}
        />
        <Divider style={{ backgroundColor: theme.colors.onSurface }} />
        <Menu.Item
          onPress={() => {
            handleSelect("new");
          }}
          style={{
            backgroundColor:
              currentSort === "new" ? theme.colors.tertiary : undefined,
          }}
          title="Newest"
          accessibilityState={{ selected: currentSort === "new" }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("old");
          }}
          style={{
            backgroundColor:
              currentSort === "old" ? theme.colors.tertiary : undefined,
          }}
          title="Oldest"
          accessibilityState={{ selected: currentSort === "old" }}
        />
        <Divider style={{ backgroundColor: theme.colors.onSurface }} />
        <Menu.Item
          onPress={() => {
            handleSelect("rating desc");
          }}
          style={{
            backgroundColor:
              currentSort === "rating desc" ? theme.colors.tertiary : undefined,
          }}
          title="Rating (High to Low)"
          accessibilityState={{ selected: currentSort === "rating desc" }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("rating asc");
          }}
          style={{
            backgroundColor:
              currentSort === "rating asc" ? theme.colors.tertiary : undefined,
          }}
          title="Rating (Low to High)"
          accessibilityState={{ selected: currentSort === "rating asc" }}
        />
        <Divider style={{ backgroundColor: theme.colors.onSurface }} />
        <Menu.Item
          onPress={() => {
            handleSelect("title");
          }}
          style={{
            backgroundColor:
              currentSort === "title" ? theme.colors.tertiary : undefined,
          }}
          title="Title (A-Z)"
          accessibilityState={{ selected: currentSort === "title" }}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
