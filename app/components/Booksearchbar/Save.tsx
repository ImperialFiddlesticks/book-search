import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

interface SaveProps {
  readonly isSaved: boolean;
  readonly onToggle: () => void;
}

export default function Save({ isSaved, onToggle }: SaveProps) {
  return (
    <Pressable hitSlop={10} onPress={onToggle}>
      <Ionicons
        name={isSaved ? "star" : "star-outline"}
        size={24}
        color={isSaved ? "gold" : "grey"}
      />
    </Pressable>
  );
}
