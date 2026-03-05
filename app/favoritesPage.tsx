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
    <ScrollView style={{ position: "relative" }}>
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

      <ModalComponent text='+ New Collection'
      submitText="Create collection"
      disabled={!inputText.trim()}
      onClose={() => setInputText("")}
      onPress={() => {
        if (inputText.trim()) {
          addNewCollection(inputText.trim());
          setInputText("");
        }
      }}>
        <View>
          <Text>Collection name</Text>
          <TextInput
            onChangeText={(text) => setInputText(text)}
            value={inputText}
            maxLength={40}
            placeholder='American classics, English poetry, favourite writers, etc.'
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 8, fontSize: 16 }}
          />
        </View>
      </ModalComponent>
    </ScrollView>
  );
}
