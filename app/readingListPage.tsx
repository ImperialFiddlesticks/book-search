import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Appbar, Snackbar, Text } from "react-native-paper";
import Header from "../components/Header";
import BookCard from "../components/BookCard";
import ModalComponent from "../components/ModalComponent";
import ConfirmOverlay from "../components/ConfirmOverlay";
import BottomOptionsBar from "../components/BottomOptionsBar";
import { useReadingListStore } from "../store/readingListStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReadingListPage() {
  const readingList = useReadingListStore((state) => state.readingList);
  const { toggleReadingList } = useReadingListStore();
  const [selectMode, setSelectMode] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Set<string>>(new Set());
  const [clearConfirmVisible, setClearConfirmVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const toggleSelect = (key: string) => {
    setSelectedBooks((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const removeSelected = async () => {
    const count = selectedBooks.size;
    for (const book of readingList.filter((b) => selectedBooks.has(b.key))) {
      await toggleReadingList(book);
    }
    setSnackbarText(`${count} ${count === 1 ? "book" : "books"} removed`);
    setSelectMode(false);
    setSelectedBooks(new Set());
  };

  const clearAll = async () => {
    const count = readingList.length;
    for (const book of [...readingList]) {
      await toggleReadingList(book);
    }
    setSnackbarText(`${count} ${count === 1 ? "book" : "books"} removed`);
    setClearConfirmVisible(false);
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Header title="FOLIO" />
      <View style={styles.titleRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.pageTitle}>Reading list</Text>
          <Text style={styles.bookCount}>
            {readingList.length} {readingList.length === 1 ? "book" : "books"}
          </Text>
        </View>
        <ModalComponent
          text="Reading list options"
          submitText=""
          renderTrigger={(openModal) => (
            <Appbar.Action
              icon="dots-vertical"
              onPress={openModal}
              accessibilityLabel="Reading list options menu"
            />
          )}
        >
          {(closeModal) => (
            <>
              <Pressable
                style={styles.modalOption}
                accessibilityRole="button"
                onPress={async () => {
                  await closeModal();
                  setSelectMode(true);
                  setSelectedBooks(new Set());
                }}
              >
                <Text style={styles.modalOptionText}>Select...</Text>
              </Pressable>
              <Pressable
                style={styles.modalOption}
                accessibilityRole="button"
                disabled={readingList.length === 0}
                onPress={async () => {
                  await closeModal();
                  setClearConfirmVisible(true);
                }}
              >
                <Text
                  style={[
                    styles.modalDeleteText,
                    readingList.length === 0 && styles.modalDisabledText,
                  ]}
                >
                  Clear reading list
                </Text>
              </Pressable>
            </>
          )}
        </ModalComponent>

        <ConfirmOverlay
          visible={clearConfirmVisible}
          title="Clear reading list?"
          message="All books will be removed from your reading list"
          confirmLabel="Clear"
          onCancel={() => setClearConfirmVisible(false)}
          onConfirm={clearAll}
        />
      </View>

      {readingList.length === 0 ? (
        <Text style={styles.empty}>No books in reading list yet.</Text>
      ) : (
        <FlatList
          data={readingList}
          keyExtractor={(item) => item.key}
          numColumns={3}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              showTitle
              showAuthor
              onLongPress={() => setSelectMode(true)}
              selected={selectedBooks.has(item.key)}
              onSelect={selectMode ? () => toggleSelect(item.key) : undefined}
            />
          )}
        />
      )}

      {selectMode && (
        <BottomOptionsBar>
          <Pressable
            onPress={() => {
              setSelectMode(false);
              setSelectedBooks(new Set());
            }}
          >
            <Text style={styles.selectBarCancel}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              const allSelected = selectedBooks.size === readingList.length;
              if (allSelected) setSelectedBooks(new Set());
              else setSelectedBooks(new Set(readingList.map((b) => b.key)));
            }}
          >
            <Text style={styles.selectBarAction}>
              {selectedBooks.size === readingList.length
                ? "Deselect all"
                : "Select all"}
            </Text>
          </Pressable>
          <Pressable
            disabled={selectedBooks.size === 0}
            onPress={removeSelected}
          >
            <Text
              style={[
                styles.selectBarAction,
                selectedBooks.size === 0 && styles.modalDisabledText,
              ]}
            >
              Remove
            </Text>
          </Pressable>
        </BottomOptionsBar>
      )}

      <Snackbar
        visible={!!snackbarText}
        onDismiss={() => setSnackbarText("")}
        duration={3000}
        style={styles.snackbar}
        theme={{ colors: { inverseOnSurface: "#fff" } }}
      >
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "600" }}>
          {snackbarText}
        </Text>
      </Snackbar>
    </SafeAreaView>
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
  titleGroup: {
    flexDirection: "column",
    gap: 4,
  },
  pageTitle: {
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
    color: "#C8703A",
    fontWeight: "600",
  },
  modalDeleteText: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
    fontWeight: "600",
  },
  modalDisabledText: {
    color: "#ccc",
  },
  selectBarCancel: {
    fontSize: 16,
    color: "#000",
    fontFamily: "SourceSans3_400Regular",
    paddingHorizontal: 4,
  },
  selectBarAction: {
    fontSize: 16,
    color: "#C8703A",
    fontWeight: "600",
    fontFamily: "SourceSans3_600SemiBold",
  },
  snackbar: {
    backgroundColor: "#C8703A",
    borderRadius: 4,
  },
});
