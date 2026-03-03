import SavedProps from "@/types/savedProps";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
      {isSaved ? (
        <FontAwesome name="star" size={24} color="#f8b197" />
      ) : (
        <Feather name="star" size={24} color="grey" />
      )}
    </Pressable>
  );
}
