import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function ScannerButton() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/scanner");
  };

  return (
    <Button
      mode="outlined"
      onPress={handlePress}
      icon="barcode-scan"
      style={{ margin: 10 }}
      accessibilityLabel="Scan book barcode"
      accessibilityHint="Opens barcode scanner"
    >
      Scan Book
    </Button>
  );
}
