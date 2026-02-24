import React, { useEffect } from "react";
import CollectionCard from "./components/CollectionCard";
import { useFavoritesStore } from "./store/favoritesStore";
import { ScrollView } from "react-native";
import Header from "./components/Header";

export default function FavoritesScreen() {
  const { favorites, loadFavorites } = useFavoritesStore();

  useEffect(() => {
    loadFavorites();
  }, []);
  return (
    <ScrollView>
      <Header title="Favorites"/>
      <CollectionCard
        collection={{
          savedItems: favorites,
          title: "Favourites",
        }}
      />
    </ScrollView>
  );
}
