import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Header({ title }: { readonly title: string }) {
  const router = useRouter();
  const goBack = () => router.back();
  const theme = useTheme();
  const navigateToFavorites = () => router.push("/favoritesPage");

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: "transparent" }]}>
      <Appbar.BackAction
        style={styles.iconButton}
        iconColor={theme.colors.onSurface}
        onPress={goBack}
        accessibilityLabel="Go back"
        accessibilityHint="Navigates to the previous screen"
      />
      <Appbar.Content titleStyle={styles.headerTitle} title={title} />
      <Appbar.Action
        style={styles.iconButton}
        icon="star"
        onPress={navigateToFavorites}
        accessibilityLabel="Favorites Page"
        accessibilityHint="Navigates to the Favorites Page"
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    width: "100%",
  },

  headerTitle: {
    textAlign: "center",
  },

  iconButton: {},
});
