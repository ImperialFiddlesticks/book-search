import {
  AccessibilityRole,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface IconProps {
  size: number;
  color: string;
}
interface ActionButtonProps {
  readonly icon: React.ComponentType<IconProps>;
  readonly label: string;
  readonly onPress: () => void;
  readonly color?: string;
  readonly accessibilityRole?: AccessibilityRole;
  readonly accessibilityState?: {
    checked?: boolean;
    disabled?: boolean;
    selected?: boolean;
  };
}

export default function ActionButton({
  icon: Icon,
  label,
  onPress,
  color,
  accessibilityRole,
  accessibilityState,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      accessibilityLabel={label}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
    >
      <View style={styles.iconContainer}>
        <Icon size={30} color={color ?? "#fff"} />
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
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
