import React, { useEffect } from "react";
import CollectionCard from "../components/CollectionCard";
import { useFavoritesStore } from "../store/favoritesStore";
import { ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import Header from "../components/Header";
import ModalComponent from "../components/ModalComponent";
import { useCollectionsStore } from "../store/collectionsStore";

export default function FavoritesScreen() {
  const { favorites, loadFavorites } = useFavoritesStore();
  const { collections, addNewCollection, loadCollections } =
    useCollectionsStore();

  useEffect(() => {
    loadCollections();
  }, []);

  return (
    <ScrollView style={{ position: "relative" }}>
      <Header title='Favorites' />
      {collections.map((c) => (
        <CollectionCard
          collection={{
            savedItems: c.books,
            title: c.title,
          }}
        />
      ))}

      <ModalComponent text='+ New Collection'>
        <form>
          <label htmlFor='new-collection-name'>Collection name</label>
          <input type='text' id='new-collection-name'></input>
          <Button>Create new collection</Button>
        </form>
      </ModalComponent>
    </ScrollView>
  );
}
