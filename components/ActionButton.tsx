import { LucideIcon } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ActionButtonProps {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly onPress: () => void;
}

export default function ActionButton({
  icon: Icon,
  label,
  onPress,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      accessibilityLabel={label}
    >
      <View style={styles.iconContainer}>
        <Icon size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 8,
  },
  iconContainer: {
    backgroundColor: "#f8b197",
    padding: 5,
    borderRadius: 5,
  },
});
