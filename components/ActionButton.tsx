import { useRef } from "react";
import {
  AccessibilityRole,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.85, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    onPress();
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      accessibilityLabel={label}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
    >
      <Animated.View
        style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}
      >
        <Icon size={30} color={color ?? "#fff"} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 8,
  },
  iconContainer: {
    backgroundColor: "#D4895A",
    padding: 5,
    borderRadius: 5,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
