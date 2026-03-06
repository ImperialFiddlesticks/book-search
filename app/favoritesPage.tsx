import { useState } from "react";
import CollectionCard from "../components/CollectionCard";
import { View, ScrollView, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import { useCollectionsStore } from "../store/collectionsStore";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
  const collections = useCollectionsStore((state) => state.collections);
  const { addNewCollection } = useCollectionsStore();
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  console.log({ collections });

  return (
    <ScrollView style={{ position: "relative" }} keyboardShouldPersistTaps="always">
      <Header title='Favorites' />
      {collections.map((c) => (
        <CollectionCard
          key={c.title}
          collection={{
            savedItems: c.books,
            title: c.title,
          }}
          onPress={() => router.push(`/collection/${encodeURIComponent(c.title)}`)}
        />
      ))}

      <ModalComponent
        text='New Collection'
        submitText="Done"
        disabled={!inputText.trim()}
        onClose={() => setInputText("")}
        onPress={() => {
          if (inputText.trim()) {
            addNewCollection(inputText.trim());
            setInputText("");
          }
        }}
      >
        <TextInput
          autoFocus
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          maxLength={40}
          placeholder='Collection name'
          placeholderTextColor="#999"
          style={{ fontSize: 16, paddingVertical: 4 }}
        />
      </ModalComponent>
    </ScrollView>
  );
}
