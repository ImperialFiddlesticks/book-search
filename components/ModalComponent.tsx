import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Animated,
  Dimensions,
  Easing,
} from "react-native";

const KEYBOARD_OVERLAP = 40;
const CONTENT_PADDING_BOTTOM = KEYBOARD_OVERLAP + 30;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const ANIM_DURATION = 400;

export default function ModalComponent({
  text,
  children,
  onPress,
  submitText,
  disabled,
  dismissable = true,
  onClose,
  onOpen,
  renderTrigger,
}: {
  readonly text: string;
  readonly children:
    | React.ReactNode
    | ((closeModal: () => Promise<void>) => React.ReactNode);
  readonly submitText?: string;
  readonly onPress?: () => void | boolean;
  readonly disabled?: boolean;
  readonly dismissable?: boolean;
  readonly onClose?: () => void;
  readonly onOpen?: () => void;
  readonly renderTrigger?: (openModal: () => void) => React.ReactNode;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: ANIM_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
      setTimeout(() => onOpen?.(), 50);
    }
  }, [modalVisible]);

  const animateClose = (callback?: () => void) => {
    Keyboard.dismiss();
    return new Promise<void>((resolve) => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: ANIM_DURATION,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
        onClose?.();
        callback?.();
        resolve();
      });
    });
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => animateClose()}
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
            <Animated.View
              style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}
            >
              <Pressable
                style={styles.overlayBackground}
                onPress={dismissable ? () => animateClose() : undefined}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.modalView,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{text}</Text>
                <Pressable
                  onPress={() => animateClose()}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                  style={styles.headerLeft}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                {submitText ? (
                  <Pressable
                    disabled={disabled}
                    onPress={() => {
                      if (onPress?.() === false) return;
                      animateClose();
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="submit input value"
                    style={styles.headerRight}
                  >
                    <Text
                      style={[
                        styles.doneText,
                        disabled && styles.doneTextDisabled,
                      ]}
                    >
                      {submitText}
                    </Text>
                  </Pressable>
                ) : null}
              </View>
              <View style={styles.content}>
                {typeof children === "function"
                  ? children(() => animateClose())
                  : children}
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
      {renderTrigger ? (
        renderTrigger(() => setModalVisible(true))
      ) : (
        <Pressable
          style={styles.openButton}
          onPress={() => setModalVisible(true)}
          accessibilityRole="button"
          accessibilityLabel={text}
          accessibilityHint="Opens modal"
        >
          <Text style={styles.openButtonText}>{text}</Text>
        </Pressable>
      )}
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
    backgroundColor: "rgb(254, 255, 243)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
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
  headerLeft: {
    position: "absolute",
    left: 16,
  },
  headerRight: {
    position: "absolute",
    right: 16,
  },
  cancelText: {
    fontSize: 16,
    color: "#000",
  },
  doneText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fa6b47",
  },
  doneTextDisabled: {
    color: "#f8b197",
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
