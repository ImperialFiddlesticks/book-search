import { useAuthorDetail } from "@/hooks/openLibraryApi";
import { useLocalSearchParams } from "expo-router";

export default function AuthorDetails() {
  const { key } = useLocalSearchParams();
  const { data: author, isLoading, isError } = useAuthorDetail(key as string);
}
