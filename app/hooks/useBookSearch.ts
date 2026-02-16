import { useQuery } from "@tanstack/react-query";
import { Book } from "../types/bookProps";

interface BookSearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}

const fetchBooks = async (query: string): Promise<BookSearchResponse> => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await response.json();
  return data;
};

export const useBookSearch = (query: string) => {
  return useQuery({
    queryKey: ["books", query],
    queryFn: () => fetchBooks(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};
