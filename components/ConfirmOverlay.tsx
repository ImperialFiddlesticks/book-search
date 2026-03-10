import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface ConfirmOverlayProps {
  readonly visible: boolean;
  readonly title: string;
  readonly message: string;
  readonly confirmLabel: string;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
}

export default function ConfirmOverlay({
  visible,
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
}: ConfirmOverlayProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      accessibilityViewIsModal={true}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <Pressable
            style={styles.option}
            accessibilityRole="button"
            accessibilityHint="cancel"
            onPress={onCancel}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            accessibilityRole="button"
            accessibilityHint="confirm"
            onPress={onConfirm}
          >
            <Text style={styles.confirmText}>{confirmLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "rgb(254, 255, 243)",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    maxWidth: 250,
    fontSize: 14,
    textAlign: "center",
    color: "#000000cc",
    marginBottom: 16,
    marginTop: 16,
    marginInline: "auto",
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  cancelText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fa6b47",
    fontWeight: "600",
  },
  confirmText: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
    fontWeight: "600",
  },
});
