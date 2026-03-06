import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native";

const KEYBOARD_OVERLAP = 40;
const CONTENT_PADDING_BOTTOM = KEYBOARD_OVERLAP + 30;

export default function ModalComponent({
  text,
  children,
  onPress,
  submitText,
  disabled,
  onClose,
}: {
  readonly text: string;
  readonly children: React.ReactNode;
  readonly submitText: string;
  readonly onPress?: () => void;
  readonly disabled?: boolean;
  readonly onClose?: () => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => {
    Keyboard.dismiss();
    onClose?.();
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
        accessibilityViewIsModal={true}
      >
        <ScrollView
          style={{ backgroundColor: "transparent" }}
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
          bounces={false}
        >
          <KeyboardAvoidingView
            style={styles.overlay}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-KEYBOARD_OVERLAP}
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={handleClose}
            >
              <View style={styles.overlayBackground} />
            </Pressable>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <Pressable
                  onPress={handleClose}
                  accessibilityRole='button'
                  accessibilityLabel='Cancel'
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Text style={styles.headerTitle}>{text}</Text>
                <Pressable
                  disabled={disabled}
                  onPress={() => {
                    Keyboard.dismiss();
                    onPress?.();
                    setModalVisible(false);
                  }}
                  accessibilityRole='button'
                  accessibilityLabel={submitText}
                >
                  <Text style={[styles.doneText, disabled && { opacity: 0.3 }]}>{submitText}</Text>
                </Pressable>
              </View>
              <View style={styles.content}>
                {children}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
      <Pressable
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
        accessibilityRole='button'
        accessibilityLabel={text}
        accessibilityHint='Opens modal'
      >
        <Text style={styles.openButtonText}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  cancelText: {
    fontSize: 16,
    color: "#000",
  },
  doneText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0095f6",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: CONTENT_PADDING_BOTTOM,
  },
  openButton: {
    padding: 10,
  },
  openButtonText: {
    color: "#0095f6",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
