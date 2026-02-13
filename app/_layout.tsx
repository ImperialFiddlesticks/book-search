import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider
        settings={{
          icon: (props) => <MaterialCommunityIcons {...props} />,
        }}
      >
        <Stack />
      </PaperProvider>
    </QueryClientProvider>
  );
}
