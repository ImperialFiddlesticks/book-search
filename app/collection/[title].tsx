import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View, Modal, TextInput, type TextInput as TextInputType } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useCollectionsStore } from "../../store/collectionsStore";
import CollectionBookComponent from "../../components/CollectionBookComponent";
import Header from "../../components/Header";
import ModalComponent from "../../components/ModalComponent";

function AutoOpen({ onMount }: { onMount: () => void }) {
  useEffect(() => { onMount(); }, []);
  return null;
}

export default function CollectionPage() {
  const { title } = useLocalSearchParams<{ title: string }>();
  const collection = useCollectionsStore((state) =>
    state.collections.find((c) => c.title === title),
  );

  const collections = useCollectionsStore((state) => state.collections);
  const { deleteCollection, renameCollection } = useCollectionsStore();
  const router = useRouter();

  const books = collection?.books ?? [];

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [renameText, setRenameText] = useState(title);
  const [renameError, setRenameError] = useState("");
  const renameInputRef = useRef<TextInputType>(null);

  return (
    <>
      <Header title='Collection' />
      <View style={styles.titleRow}>
        <Text style={styles.collectionTitle}>{title}</Text>
        <ModalComponent
          text='Collection options'
          submitText=''
          renderTrigger={(openModal) => (
            <Appbar.Action
              icon='dots-vertical'
              onPress={openModal}
              accessibilityLabel='Collection options menu'
            />
          )}
        >
          {(closeModal) => (
            <>
              {title !== "All favorites" && (
                <Pressable
                  style={styles.modalOption}
                  accessibilityRole='button'
                  onPress={async () => {
                    await closeModal();
                    setRenameText(title);
                    setRenameVisible(true);
                  }}
                >
                  <Text style={styles.modalOptionText}>Rename collection</Text>
                </Pressable>
              )}
              <Pressable style={styles.modalOption} accessibilityRole='button'>
                <Text style={styles.modalOptionText}>Add to collection</Text>
              </Pressable>
              {title !== "All favorites" && (
                <Pressable
                  style={styles.modalOption}
                  accessibilityRole='button'
                  onPress={async () => {
                    await closeModal();
                    setConfirmVisible(true);
                  }}
                >
                  <Text style={styles.modalDeleteText}>Delete collection</Text>
                </Pressable>
              )}
            </>
          )}
        </ModalComponent>

        <Modal
          animationType='fade'
          transparent={true}
          visible={confirmVisible}
          accessibilityViewIsModal={true}
          onRequestClose={() => setConfirmVisible(false)}
        >
          <View style={styles.confirmOverlay}>
            <View style={styles.confirmBox}>
              <Text style={styles.confirmTitle}>Delete collection?</Text>
              <Text style={styles.confirmMessage}>
                When you delete this collection, the items will still be saved
              </Text>

              <Pressable
                style={styles.modalOption}
                accessibilityRole='button'
                onPress={() => {
                  if (confirmVisible) {
                    setConfirmVisible(false);
                  }
                }}
              >
                <Text style={styles.modalOptionText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalOption}
                accessibilityRole='button'
                onPress={() => {
                  if (confirmVisible) {
                    setConfirmVisible(false);
                    deleteCollection!(title);
                    router.replace("/favoritesPage");
                  }
                }}
              >
                <Text style={styles.modalDeleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {renameVisible && (
          <ModalComponent
            text='Rename collection'
            submitText='Done'
            disabled={!renameText.trim()}
            onClose={() => { setRenameVisible(false); setRenameError(""); }}
            onOpen={() => setTimeout(() => renameInputRef.current?.focus(), 350)}
            onPress={() => {
              const trimmed = renameText.trim();
              if (collections.some((c) => c.title === trimmed && c.title !== title)) {
                setRenameError("A collection with this name already exists");
                return false;
              }
              if (trimmed) {
                renameCollection!(title, trimmed);
                router.replace(`/collection/${encodeURIComponent(trimmed)}`);
              }
              setRenameVisible(false);
            }}
            renderTrigger={(openModal) => <AutoOpen onMount={openModal} />}
          >
            <View style={{ position: "relative", marginVertical: 16 }}>
              <TextInput
                ref={renameInputRef}
                onChangeText={(text) => { setRenameText(text); setRenameError(""); }}
                value={renameText}
                maxLength={35}
                placeholder='Collection name'
                placeholderTextColor='#999'
                selectionColor='#fa6b47'
                autoCorrect={false}
                style={{
                  fontSize: 16,
                  height: 50,
                  borderWidth: 1,
                  borderColor: renameError ? "red" : "#e0e0e0",
                  paddingHorizontal: 10,
                  paddingRight: 36,
                }}
              />
              {renameText ? (
                <Pressable
                  onPress={() => { setRenameText(""); setRenameError(""); renameInputRef.current?.focus(); }}
                  style={styles.clearButton}
                  hitSlop={8}
                >
                  <Text style={styles.clearIcon}>✕</Text>
                </Pressable>
              ) : null}
            </View>
            {renameError ? <Text style={styles.renameError}>{renameError}</Text> : null}
          </ModalComponent>
        )}
      </View>

      {books.length === 0 ? (
        <Text style={styles.empty}>No books in this collection yet.</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.key}
          numColumns={3}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <CollectionBookComponent book={item} />}
        />
      )}
    </>
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
  collectionTitle: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 22,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#858585",
    fontFamily: "SourceSans3_400Regular",
    fontSize: 16,
  },
  grid: {
    paddingHorizontal: 12,
  },
  row: {
    justifyContent: "flex-start",
    gap: 4,
    marginBottom: 12,
  },

  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fa6b47",
    fontWeight: 600,
  },

  modalDeleteText: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
    fontWeight: 600,
  },

  confirmOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmBox: {
    backgroundColor: "rgb(254, 255, 243)",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: "90%",
  },

  confirmTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },

  renameError: {
    color: "red",
    fontSize: 13,
    marginTop: -8,
  },
  clearButton: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  clearIcon: {
    fontSize: 14,
    color: "#999",
  },

  confirmMessage: {
    maxWidth: 250,
    fontSize: 14,
    textAlign: "center",
    color: "#858585",
    marginBottom: 16,
    marginTop:16,
    marginInline: "auto"
  },
});
