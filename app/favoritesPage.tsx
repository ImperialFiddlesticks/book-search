import { useRef, useState } from "react";
import CollectionCard from "../components/CollectionCard";
import {
  View,
  ScrollView,
  TextInput,
  type TextInput as TextInputType,
} from "react-native";
import { Button, Text } from "react-native-paper";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import { useCollectionsStore } from "../store/collectionsStore";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
  const collections = useCollectionsStore((state) => state.collections);
  const { addNewCollection } = useCollectionsStore();
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<TextInputType>(null);
  const router = useRouter();

  console.log({ collections });

  return (
    <ScrollView
      style={{ position: "relative" }}
      keyboardShouldPersistTaps="always"
    >
      <Header />
      {collections.map((c) => (
        <CollectionCard
          key={c.title}
          collection={{
            savedItems: c.books,
            title: c.title,
          }}
          onPress={() =>
            router.push(`/collection/${encodeURIComponent(c.title)}`)
          }
        />
      ))}

      <ModalComponent
        text="New Collection"
        submitText="Done"
        disabled={!inputText.trim()}
        onClose={() => setInputText("")}
        onOpen={() => inputRef.current?.focus()}
        onPress={() => {
          if (inputText.trim()) {
            addNewCollection(inputText.trim());
            setInputText("");
          }
        }}
      >
        <TextInput
          ref={inputRef}
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          maxLength={40}
          placeholder="Collection name"
          placeholderTextColor="#999"
          selectionColor="#C8703A"
          style={{
            fontSize: 16,
            height: 50,
            borderWidth: 1,
            borderColor: "#e0e0e0",
            paddingHorizontal: 10,
            marginVertical: 16,
          }}
        />
      </ModalComponent>
    </ScrollView>
  );
}
