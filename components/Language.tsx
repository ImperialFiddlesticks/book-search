import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Divider } from "react-native-paper";

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
          title="All"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("English");
          }}
          title="English"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("French");
          }}
          title="French"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("German");
          }}
          title="German"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Spanish");
          }}
          title="Spanish"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Italian");
          }}
          title="Italian"
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Swedish");
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
