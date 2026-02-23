import { useState } from "react";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Text, View, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Scanner() {
  const [barcodeScanned, setBarcodeScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  } else if (!permission.granted) {
    //Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text>Camera permissions are needed to scan barcodes.</Text>
        <Button onPress={requestPermission}>Request Permission</Button>
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
      />
      <View style={StyleSheet.absoluteFillObject}>
        <IconButton
          onPress={() => router.back()}
          icon="close"
          size={30}
          style={{ alignSelf: "flex-end", margin: 16 }}
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
