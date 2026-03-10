import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View, TextInput, type TextInput as TextInputType } from "react-native";
import { Appbar, Snackbar, Text } from "react-native-paper";
import { useCollectionsStore } from "../../store/collectionsStore";
import { useReadingListStore } from "../../store/readingListStore";
import BookCard from "../../components/BookCard";
import Header from "../../components/Header";
import ModalComponent from "../../components/ModalComponent";
import NewCollectionModal from "../../components/NewCollectionModal";
import ConfirmOverlay from "../../components/ConfirmOverlay";
import BottomOptionsBar from "../../components/BottomOptionsBar";

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
  const { deleteCollection, renameCollection, moveBooks, removeBooksFromCollection, unsaveBooks } = useCollectionsStore();
  const { addBooks } = useReadingListStore();
  const router = useRouter();

  const allFavBooks = useCollectionsStore((state) =>
    state.collections.find((c) => c.title === "All favorites")?.books ?? [],
  );
  const books = (collection?.books ?? []).filter((b) =>
    allFavBooks.some((f) => f.key === b.key),
  );

  const collectionBookKeys = new Set(books.map((b) => b.key));
  const [selectMode, setSelectMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());

  const toggleSelect = (key: string) => {
    setSelectedBooks((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const allSelected = books.length > 0 && selectedBooks.size === books.length;

  const [selectOptionsVisible, setSelectOptionsVisible] = useState(false);
  const [moveToVisible, setMoveToVisible] = useState(false);
  const [moveToTarget, setMoveToTarget] = useState<string | null>(null);
  const [snackbarText, setSnackbarText] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [renameText, setRenameText] = useState(title);
  const [renameError, setRenameError] = useState("");
  const renameInputRef = useRef<TextInputType>(null);
  const [newCollectionVisible, setNewCollectionVisible] = useState(false);
  const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false);
  const [unsaveConfirmVisible, setUnsaveConfirmVisible] = useState(false);
  const [addToCollectionMode, setAddToCollectionMode] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {selectOptionsVisible && (
        <ModalComponent
          text='Select options'
          onClose={() => { setSelectOptionsVisible(false); setSelectMode(false); setSelectedBooks(new Set()); }}
          renderTrigger={(openModal) => <AutoOpen onMount={openModal} />}
        >
          {() => {
            const hasSelection = selectedBooks.size > 0;
            return (
              <>
                <Pressable
                  style={styles.modalOption}
                  accessibilityRole='button'
                  disabled={!hasSelection}
                  onPress={() => {
                    setSelectOptionsVisible(false);
                    setUnsaveConfirmVisible(true);
                  }}
                >
                  <Text style={[styles.modalOptionText, !hasSelection && styles.modalDisabledText]}>Unsave</Text>
                </Pressable>
                <Pressable
                  style={styles.modalOption}
                  accessibilityRole='button'
                  disabled={!hasSelection}
                  onPress={() => {
                    setSelectOptionsVisible(false);
                    setMoveToTarget(null);
                    setMoveToVisible(true);
                  }}
                >
                  <Text style={[styles.modalOptionText, !hasSelection && styles.modalDisabledText]}>Move to...</Text>
                </Pressable>
                <Pressable
                  style={styles.modalOption}
                  accessibilityRole='button'
                  disabled={!hasSelection}
                  onPress={() => {
                    setSelectOptionsVisible(false);
                    setRemoveConfirmVisible(true);
                  }}
                >
                  <Text style={[styles.modalOptionText, !hasSelection && styles.modalDisabledText]}>Remove from collection</Text>
                </Pressable>
                <Pressable
                  style={styles.modalOption}
                  accessibilityRole='button'
                  disabled={!hasSelection}
                  onPress={() => {
                    const selected = books.filter((b) => selectedBooks.has(b.key));
                    addBooks(selected);
                    const count = selected.length;
                    setSnackbarText(`${count} ${count === 1 ? "item" : "items"} added to Reading list`);
                    setSelectOptionsVisible(false);
                    setSelectMode(false);
                    setSelectedBooks(new Set());
                  }}
                >
                  <Text style={[styles.modalOptionText, !hasSelection && styles.modalDisabledText]}>Save to Reading list</Text>
                </Pressable>
              </>
            );
          }}
        </ModalComponent>
      )}
      {moveToVisible && (
        <ModalComponent
          text='Move to'
          submitText='Done'
          disabled={!moveToTarget}
          onClose={() => { setMoveToVisible(false); setSelectMode(false); setSelectedBooks(new Set()); }}
          onPress={() => {
            if (moveToTarget) {
              const count = selectedBooks.size;
              moveBooks!(title, moveToTarget, selectedBooks);
              setSnackbarText(
                `${count} ${count === 1 ? "item" : "items"} moved to ${moveToTarget}`
              );
            }
            setMoveToVisible(false);
            setSelectMode(false);
            setSelectedBooks(new Set());
          }}
          renderTrigger={(openModal) => <AutoOpen onMount={openModal} />}
        >
          {() => (
            <>
              {collections
                .filter((c) => c.title !== "All favorites" && c.title !== title)
                .map((c) => (
                  <Pressable
                    key={c.title}
                    style={styles.modalOption}
                    accessibilityRole='radio'
                    onPress={() => setMoveToTarget(c.title)}
                  >
                    <View style={styles.radioRow}>
                      <View style={styles.emptyCircle}>
                        {moveToTarget === c.title && <View style={styles.filledInner} />}
                      </View>
                      <Text style={styles.modalOptionText}>{c.title}</Text>
                    </View>
                  </Pressable>
                ))}
              <Pressable
                style={styles.modalOption}
                accessibilityRole='button'
                onPress={() => {
                  setMoveToVisible(false);
                  setNewCollectionVisible(true);
                }}
              >
                <Text style={styles.modalOptionText}>+ New collection</Text>
              </Pressable>
            </>
          )}
        </ModalComponent>
      )}
      {newCollectionVisible && (
        <NewCollectionModal
          renderTrigger={(openModal) => <AutoOpen onMount={openModal} />}
          onClose={() => { setNewCollectionVisible(false); setSelectMode(false); setSelectedBooks(new Set()); }}
          onCreated={(name) => {
            const count = selectedBooks.size;
            moveBooks!(title, name, selectedBooks);
            setSnackbarText(`${count} ${count === 1 ? "item" : "items"} moved to ${name}`);
            setNewCollectionVisible(false);
            setSelectMode(false);
            setSelectedBooks(new Set());
          }}
        />
      )}
      {selectMode && !selectOptionsVisible && !moveToVisible && !addToCollectionMode && (
        <BottomOptionsBar>
          <Pressable
            onPress={() => { setSelectMode(false); setSelectedBooks(new Set()); }}
          >
            <Text style={styles.selectBarCancel}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (allSelected) {
                setSelectedBooks(new Set());
              } else {
                setSelectedBooks(new Set(books.map((b) => b.key)));
              }
            }}
          >
            <Text style={styles.selectBarAction}>{allSelected ? 'Deselect all' : 'Select all'}</Text>
          </Pressable>
          <Appbar.Action
            icon='dots-vertical'
            disabled={selectedBooks.size === 0}
            onPress={() => setSelectOptionsVisible(true)}
            accessibilityLabel='More select options'
          />
        </BottomOptionsBar>
      )}
      {addToCollectionMode && (
        <BottomOptionsBar>
          <Pressable
            onPress={() => {
              setAddToCollectionMode(false);
              setSelectMode(false);
              setSelectedBooks(new Set());
            }}
          >
            <Text style={styles.selectBarCancel}>Cancel</Text>
          </Pressable>
          <Pressable
            disabled={selectedBooks.size === collectionBookKeys.size}
            onPress={() => {
              const count = selectedBooks.size - collectionBookKeys.size;
              moveBooks("All favorites", title, selectedBooks);
              setSnackbarText(`${count} ${count === 1 ? "item" : "items"} added to ${title}`);
              setAddToCollectionMode(false);
              setSelectMode(false);
              setSelectedBooks(new Set());
            }}
          >
            <Text style={[styles.selectBarAction, selectedBooks.size === collectionBookKeys.size && styles.modalDisabledText]}>
              Add to collection
            </Text>
          </Pressable>
        </BottomOptionsBar>
      )}
      <View style={styles.titleRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.collectionTitle}>{title}</Text>
          <Text style={styles.bookCount}>{books.length} {books.length === 1 ? "book" : "books"}</Text>
        </View>
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
              <Pressable
                style={styles.modalOption}
                accessibilityRole='button'
                onPress={async () => {
                  await closeModal();
                  setSelectMode(true);
                  setSelectedBooks(new Set());
                }}
              >
                <Text style={styles.modalOptionText}>Select...</Text>
              </Pressable>
              {title !== "All favorites" && (
                <Pressable
                  style={styles.modalOption}
                  accessibilityRole='button'
                  onPress={async () => {
                    await closeModal();
                    setAddToCollectionMode(true);
                    setSelectMode(true);
                    setSelectedBooks(new Set(collectionBookKeys));
                  }}
                >
                  <Text style={styles.modalOptionText}>Add to collection</Text>
                </Pressable>
              )}
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

        <ConfirmOverlay
          visible={confirmVisible}
          title='Delete collection?'
          message='When you delete this collection, the items will still be saved'
          confirmLabel='Delete'
          onCancel={() => setConfirmVisible(false)}
          onConfirm={() => {
            setConfirmVisible(false);
            deleteCollection!(title);
            router.replace("/profilePage");
          }}
        />

        <ConfirmOverlay
          visible={removeConfirmVisible}
          title='Remove from collection?'
          message='You will still be able to find these items in "All favorites"'
          confirmLabel='Remove'
          onCancel={() => { setRemoveConfirmVisible(false); setSelectMode(false); setSelectedBooks(new Set()); }}
          onConfirm={() => {
            const count = selectedBooks.size;
            removeBooksFromCollection(title, selectedBooks);
            setSnackbarText(`${count} ${count === 1 ? "item" : "items"} removed from collection`);
            setRemoveConfirmVisible(false);
            setSelectMode(false);
            setSelectedBooks(new Set());
          }}
        />

        <ConfirmOverlay
          visible={unsaveConfirmVisible}
          title='Unsave selected items?'
          message='These items will be removed from all collections'
          confirmLabel='Unsave'
          onCancel={() => { setUnsaveConfirmVisible(false); setSelectMode(false); setSelectedBooks(new Set()); }}
          onConfirm={() => {
            const count = selectedBooks.size;
            unsaveBooks(selectedBooks);
            setSnackbarText(`${count} ${count === 1 ? "item" : "items"} unsaved`);
            setUnsaveConfirmVisible(false);
            setSelectMode(false);
            setSelectedBooks(new Set());
          }}
        />

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

      {(addToCollectionMode ? allFavBooks : books).length === 0 ? (
        <Text style={styles.empty}>No books in this collection yet.</Text>
      ) : (
        <FlatList
          data={addToCollectionMode ? allFavBooks : books}
          keyExtractor={(item) => item.key}
          numColumns={3}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              showTitle
              showAuthor
              onLongPress={addToCollectionMode ? undefined : () => setSelectMode(true)}
              hideSave={addToCollectionMode}
              selected={selectedBooks.has(item.key)}
              onSelect={selectMode ? () => {
                if (addToCollectionMode && collectionBookKeys.has(item.key)) return;
                toggleSelect(item.key);
              } : undefined}
            />
          )}
        />
      )}
      <Snackbar
        visible={!!snackbarText}
        onDismiss={() => setSnackbarText("")}
        duration={3000}
        style={styles.snackbar}
        theme={{ colors: { inverseOnSurface: "#fff" } }}
      >
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: 600}}>{snackbarText}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  selectBarCancel: {
    fontSize: 16,
    color: "#000",
    fontFamily: "SourceSans3_400Regular",
    paddingHorizontal: 4,
  },
  selectBarAction: {
    fontSize: 16,
    color: "#fa6b47",
    fontWeight: "600",
    fontFamily: "SourceSans3_600SemiBold",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleGroup: {
    flexDirection: "column",
    gap: 4,
  },
  collectionTitle: {
    fontFamily: "LibreBaskerville_700Bold",
    fontSize: 22,
  },
  bookCount: {
    fontFamily: "SourceSans3_400Regular",
    fontSize: 14,
    color: "#858585",
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

  modalDisabledText: {
    color: "#ccc",
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

  snackbar: {
    backgroundColor: "#fa6b47",
    borderRadius: 4,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emptyCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#f8b197",
    backgroundColor: "transparent",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  filledInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f8b197",
  },
});
