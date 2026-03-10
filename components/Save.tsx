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
      accessibilityLabel="Favorite"
      accessibilityHint="Adds book to Favorites Collection"
      accessibilityRole="togglebutton"
      accessibilityState={{ checked: isSaved }}
    >
      {isSaved ? (
        <FontAwesome name="star" size={24} color="#D4895A" />
      ) : (
        <Feather name="star" size={24} color="grey" />
      )}
    </Pressable>
  );
}
