import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export default function BottomOptionsBar({ children }: { readonly children: ReactNode }) {
  return <View style={styles.bar}>{children}</View>;
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 84,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgb(254, 255, 243)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
    zIndex: 10,
  },
});
