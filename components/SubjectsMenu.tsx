import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Divider, useTheme } from "react-native-paper";

export type Subjects =
  | "All"
  | "Fantasy"
  | "Science Fiction"
  | "Mystery"
  | "Romance"
  | "Thriller"
  | "Historical"
  | "Biography"
  | "Horror"
  | "Children";

interface SubjectsProps {
  selectedSubjects: string[];
  onSelectSubject: (subject: string[]) => void;
}

export default function SubjectMenu({
  selectedSubjects,
  onSelectSubject,
}: SubjectsProps) {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (subject: string) => {
    if (subject === "All") {
      onSelectSubject([]);
      return;
    }

    if (selectedSubjects.includes(subject)) {
      onSelectSubject(selectedSubjects.filter((s) => s !== subject));
    } else {
      onSelectSubject([...selectedSubjects, subject]);
    }
  };

  const getSubjectsLabel = () => {
    if (selectedSubjects.length === 0) {
      return "All";
    }
    if (selectedSubjects.length === 1) {
      return selectedSubjects[0];
    }
    return `${selectedSubjects.length} selected`;
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        contentStyle={{
          backgroundColor: theme.colors.secondary,
          borderRadius: 4,
        }}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            style={{ borderRadius: 4 }}
            accessibilityLabel={`Subjects: ${getSubjectsLabel()}`}
            accessibilityHint="Opens subject filter options"
          >
            Subjects: {getSubjectsLabel()}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            handleSelect("All");
          }}
          style={{
            backgroundColor:
              selectedSubjects.length === 0 ? theme.colors.tertiary : undefined,
          }}
          title="All"
          accessibilityState={{ selected: selectedSubjects.length === 0 }}
        />
        <Divider style={{ backgroundColor: theme.colors.onSurface }} />
        <Menu.Item
          onPress={() => {
            handleSelect("Fantasy");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Fantasy")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Fantasy"
          accessibilityState={{
            selected: selectedSubjects.includes("Fantasy"),
          }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Science Fiction");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Science Fiction")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Science Fiction"
          accessibilityState={{
            selected: selectedSubjects.includes("Science Fiction"),
          }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Mystery");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Mystery")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Mystery"
          accessibilityState={{
            selected: selectedSubjects.includes("Mystery"),
          }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Romance");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Romance")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Romance"
          accessibilityState={{
            selected: selectedSubjects.includes("Romance"),
          }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Thriller");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Thriller")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Thriller"
          accessibilityState={{
            selected: selectedSubjects.includes("Thriller"),
          }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Historical");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Historical")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Historical"
          accessibilityState={{
            selected: selectedSubjects.includes("Historical"),
          }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Biography");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Biography")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Biography"
          accessibilityState={{
            selected: selectedSubjects.includes("Biography"),
          }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Horror");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Horror")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Horror"
          accessibilityState={{ selected: selectedSubjects.includes("Horror") }}
        />
        <Menu.Item
          onPress={() => {
            handleSelect("Children");
          }}
          style={{
            backgroundColor: selectedSubjects.includes("Children")
              ? theme.colors.tertiary
              : undefined,
          }}
          title="Children"
          accessibilityState={{
            selected: selectedSubjects.includes("Children"),
          }}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
