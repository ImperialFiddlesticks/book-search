import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Header({
  showBackButton = true,
}: {
  readonly showBackButton?: boolean;
}) {
  const router = useRouter();
  const goBack = () => router.back();
  const theme = useTheme();
  const navigateToFavorites = () => router.push("/profilePage");

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: "transparent" }]}>
      {showBackButton ? (
        <Appbar.BackAction
          style={styles.iconButton}
          iconColor={theme.colors.onSurface}
          onPress={goBack}
          accessibilityLabel="Go back"
          accessibilityHint="Navigates to the previous screen"
        />
      ) : (
        <Appbar.Action icon="" disabled />
      )}
      <Appbar.Content
        titleStyle={styles.headerTitle}
        title="FOLIO"
        onPress={() => router.push("/")}
        accessibilityRole="link"
        accessibilityLabel="FOLIO, go to Home screen"
        accessibilityHint="Navigates to the Home screen"
      />
      <Appbar.Action
        style={styles.iconButton}
        icon={() => (
          <FontAwesome name="star" size={24} color={theme.colors.onSurface} />
        )}
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
    fontFamily: "LibreBaskerville_700Bold",
  },

  iconButton: {},
});
