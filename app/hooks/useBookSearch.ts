import { useQuery } from "@tanstack/react-query";

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i: number;
  isbn?: string[];
  number_of_pages_median?: number;
}

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
