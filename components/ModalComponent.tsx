import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

export default function ModalComponent({
  text,
  children,
  onPress,
  submitText,
  disabled,
  onClose
}: {
  readonly text: string;
  readonly children: React.ReactNode;
  readonly submitText: string;
  readonly onPress?: () => void;
  readonly disabled?: boolean;
  readonly onClose?: () => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        accessibilityViewIsModal={true}
      >
        <View style={[styles.overlay]}>
          <View style={{ position: "relative" }}>
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                onClose?.();
                setModalVisible(false);
              }}
              accessibilityRole='button'
              accessibilityLabel='Close modal'
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
            <View style={styles.modalView}>
              {children}
              <Pressable
                style={[styles.button, styles.buttonClose, disabled && { opacity: 0.5 }]}
                disabled={disabled}
                onPress={() => {
                  onPress?.();
                  setModalVisible(!modalVisible);
                }}
                accessibilityRole='button'
                accessibilityLabel='Close'
                accessibilityHint='Closes the modal'
              >
                <Text style={styles.textStyle}>{submitText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
        accessibilityRole='button'
        accessibilityLabel={text}
        accessibilityHint='Opens modal'
      >
        <Text style={styles.textStyle}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: -6,
    right: -6,
    zIndex: 1,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
