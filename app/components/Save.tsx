import SavedProps from "@/app/types/savedProps";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function Save({ isSaved, onToggle }: SavedProps) {
  return (
    <Pressable
      hitSlop={10}
      onPress={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <Ionicons
        name={isSaved ? "star" : "star-outline"}
        size={24}
        color={isSaved ? "gold" : "grey"}
      />
    </Pressable>
  );
}
