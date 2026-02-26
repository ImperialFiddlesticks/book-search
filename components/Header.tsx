import * as React from "react";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";


export default function Header({title}: {title: string}) {
  const router = useRouter();
  const goBack = () => router.back();

  const navigateToFavorites = () => router.push("/favoritesPage");

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction style={styles.iconButton} onPress={goBack} />
      <Appbar.Content titleStyle={styles.headerTitle} title={title} />
      <Appbar.Action style={styles.iconButton} icon='star' onPress={navigateToFavorites} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "sticky",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },

  headerTitle: {
    textAlign: "center",
  },

  iconButton: {
    borderWidth: 2,
    borderColor: "rgb(73, 69, 79)",
    borderStyle: "solid",
    borderRadius: "15px"
  }
});
