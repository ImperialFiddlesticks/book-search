import { useRef, useState } from "react";
import {
  Pressable,
  TextInput,
  View,
  type TextInput as TextInputType,
} from "react-native";
import { Text } from "react-native-paper";
import { useCollectionsStore } from "../store/collectionsStore";
import ModalComponent from "./ModalComponent";

export default function NewCollectionModal({
  renderTrigger,
  onCreated,
  onClose,
}: {
  readonly renderTrigger: (openModal: () => void) => React.ReactNode;
  readonly onCreated?: (name: string) => void;
  readonly onClose?: () => void;
}) {
  const collections = useCollectionsStore((state) => state.collections);
  const { addNewCollection } = useCollectionsStore();
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<TextInputType>(null);

  return (
    <ModalComponent
      text="New Collection"
      submitText="Done"
      disabled={!inputText.trim()}
      onClose={() => {
        setInputText("");
        setError("");
        onClose?.();
      }}
      onOpen={() => setTimeout(() => inputRef.current?.focus(), 350)}
      onPress={() => {
        const trimmed = inputText.trim();
        if (collections.some((c) => c.title === trimmed)) {
          setError("A collection with this name already exists");
          return false;
        }
        if (trimmed) {
          addNewCollection(trimmed);
          setInputText("");
          onCreated?.(trimmed);
        }
      }}
      renderTrigger={renderTrigger}
    >
      <View style={{ position: "relative", marginVertical: 16 }}>
        <TextInput
          ref={inputRef}
          onChangeText={(text) => {
            setInputText(text);
            setError("");
          }}
          value={inputText}
          maxLength={35}
          placeholder="Collection name"
          placeholderTextColor="#999"
          selectionColor="#C8703A"
          autoCorrect={false}
          style={{
            fontSize: 16,
            height: 50,
            borderWidth: 1,
            borderColor: error ? "red" : "#e0e0e0",
            paddingHorizontal: 10,
            paddingRight: 36,
          }}
        />
        {inputText ? (
          <Pressable
            onPress={() => {
              setInputText("");
              setError("");
              inputRef.current?.focus();
            }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              justifyContent: "center",
              paddingHorizontal: 12,
            }}
            hitSlop={8}
          >
            <Text style={{ fontSize: 14, color: "#999" }}>✕</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text style={{ color: "red", fontSize: 13, marginTop: -8 }}>
          {error}
        </Text>
      ) : null}
    </ModalComponent>
  );
}
