import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

export default function ScannerIcon() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/scanner");
  };

  return (
    <IconButton
      mode="outlined"
      onPress={handlePress}
      icon="barcode-scan"
      size={38}
      style={{ borderRadius: 2, marginRight: 0 }}
      accessibilityLabel="Scan book barcode"
      accessibilityHint="Opens barcode scanner"
    ></IconButton>
  );
}
