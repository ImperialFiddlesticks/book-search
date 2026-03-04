import { useState } from "react";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Text, View, StyleSheet } from "react-native";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Scanner() {
  const [barcodeScanned, setBarcodeScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator
          accessibilityLabel="Loading results"
          accessibilityRole="progressbar"
          accessibilityLiveRegion="polite"
        />
      </View>
    );
  } else if (!permission.granted) {
    //Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text accessibilityRole="alert">
          Camera permissions are needed to scan barcodes.
        </Text>
        <Button
          onPress={requestPermission}
          accessibilityLabel="Request camera permission"
          accessibilityHint="Allows the app to use your camera to scan barcodes"
        >
          Request Permission
        </Button>
      </View>
    );
  }

  const handleBarcodeScan = ({ data }: BarcodeScanningResult) => {
    if (barcodeScanned) return;

    setBarcodeScanned(true);
    router.push({
      pathname: "/details",
      params: { isbn: data },
    });
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={handleBarcodeScan}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        accessibilityLabel="Camera viewfinder, point at a book barcode to scan"
        accessibilityLiveRegion="polite"
      />
      <View style={StyleSheet.absoluteFillObject}>
        <IconButton
          onPress={() => router.back()}
          icon="close"
          size={30}
          style={{ alignSelf: "flex-end", margin: 16 }}
          accessibilityLabel="Close"
          accessibilityHint="Closes the barcode scanner"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
