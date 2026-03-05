import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Divider, useTheme } from "react-native-paper";

export type LanguageOption =
  | "All"
  | "English"
  | "French"
  | "German"
  | "Spanish"
  | "Italian"
  | "Swedish";

interface LanguageProps {
  currentLanguage: LanguageOption;
  onLanguageChange: (option: LanguageOption) => void;
}

export default function Language({
  currentLanguage,
  onLanguageChange,
}: LanguageProps) {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (option: LanguageOption) => {
    onLanguageChange(option);
    closeMenu();
  };
  const getLanguageLabel = () => {
    switch (currentLanguage) {
      case "English":
        return "English";
      case "French":
        return "French";
      case "German":
        return "German";
      case "Spanish":
        return "Spanish";
      case "Italian":
        return "Italian";
      case "Swedish":
        return "Swedish";
      default:
        return "All";
    }
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{ backgroundColor: theme.colors.secondary }}
        anchor={
          <Button mode="outlined" onPress={openMenu}>
            Language: {getLanguageLabel()}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            handleSelect("All");
          }}
          style={{
            backgroundColor:
              currentLanguage === "All" ? theme.colors.tertiary : "transparent",
          }}
          title="All"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("English");
          }}
          style={{
            backgroundColor:
              currentLanguage === "English"
                ? theme.colors.tertiary
                : "transparent",
          }}
          title="English"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("French");
          }}
          style={{
            backgroundColor:
              currentLanguage === "French"
                ? theme.colors.tertiary
                : "transparent",
          }}
          title="French"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("German");
          }}
          style={{
            backgroundColor:
              currentLanguage === "German"
                ? theme.colors.tertiary
                : "transparent",
          }}
          title="German"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Spanish");
          }}
          style={{
            backgroundColor:
              currentLanguage === "Spanish"
                ? theme.colors.tertiary
                : "transparent",
          }}
          title="Spanish"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Italian");
          }}
          style={{
            backgroundColor:
              currentLanguage === "Italian"
                ? theme.colors.tertiary
                : "transparent",
          }}
          title="Italian"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Swedish");
          }}
          style={{
            backgroundColor:
              currentLanguage === "Swedish"
                ? theme.colors.tertiary
                : "transparent",
          }}
          title="Swedish"
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
