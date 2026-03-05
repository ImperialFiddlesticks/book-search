import React from "react";
import CollectionCard from "../components/CollectionCard";
import { ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import { useCollectionsStore } from "../store/collectionsStore";

export default function FavoritesScreen() {
  const collections = useCollectionsStore((state) => state.collections);
  const { addNewCollection } = useCollectionsStore();

  console.log({ collections });

  return (
    <ScrollView style={{ position: "relative" }}>
      <Header title="Favorites" />
      {collections.map((c) => (
        <CollectionCard
          key={c.title}
          collection={{
            savedItems: c.books,
            title: c.title,
          }}
        />
      ))}

      <ModalComponent text="+ New Collection">
        <form>
          <label htmlFor="new-collection-name">Collection name</label>
          <input type="text" id="new-collection-name"></input>
          <Button>Create new collection</Button>
        </form>
      </ModalComponent>
    </ScrollView>
  );
}
