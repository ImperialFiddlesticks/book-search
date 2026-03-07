import { useRef, useState } from "react";
import CollectionCard from "../components/CollectionCard";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Pressable,
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
      keyboardShouldPersistTaps='always'
    >
      <Header title='Collections' />
      <View style={styles.titleRow}>
        <Text style={styles.pageTitle}>Collections</Text>
        <ModalComponent
          text='New Collection'
          submitText='Done'
          disabled={!inputText.trim()}
          onClose={() => setInputText("")}
          onOpen={() => setTimeout(() => inputRef.current?.focus(), 350)}
          onPress={() => {
            if (inputText.trim()) {
              addNewCollection(inputText.trim());
              setInputText("");
            }
          }}
          renderTrigger={(openModal) => (
            <Pressable onPress={openModal}>
              <Text style={styles.newCollectionBtn}>+ New</Text>
            </Pressable>
          )}
        >
          <TextInput
            ref={inputRef}
            onChangeText={(text) => setInputText(text)}
            value={inputText}
            maxLength={35}
            placeholder='Collection name'
            placeholderTextColor='#999'
            selectionColor='#fa6b47'
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
      </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pageTitle: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 22,
  },
  newCollectionBtn: {
    color: "#fa6b47",
    fontWeight: "600",
    fontSize: 16,
  },
});
