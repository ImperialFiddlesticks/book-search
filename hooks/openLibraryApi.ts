import { useQuery } from "@tanstack/react-query";
import { Book } from "../types/bookProps";
import Author from "../types/authorProps";
interface BookSearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}
interface BookWorksResponse {
  description?: string | { type: string; value: string };
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
const fetchAuthor = async (query: string): Promise<Author[]> => {
  const response = await fetch(
    `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(query)}&limit=5`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch author");
  }
  const data = await response.json();
  return data.docs;
};

const fetchBookDescription = async (key: string): Promise<string | null> => {
  const response = await fetch(`https://openlibrary.org${key}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch book description");
  }
  const data: BookWorksResponse = await response.json();
  if (!data.description) return null;
  if (typeof data.description === "string") return data.description;
  return data.description.value;
};

export const useBookSearch = (query: string) => {
  return useQuery({
    queryKey: ["books", query],
    queryFn: () => fetchBooks(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBookByIsbn = (isbn: string) => {
  return useQuery({
    queryKey: ["bookByIsbn", isbn],
    queryFn: () => fetchBooks(`isbn:${isbn}`),
    enabled: !!isbn && isbn.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBookDescription = (key: string) => {
  return useQuery({
    queryKey: ["bookDescription", key],
    queryFn: () => fetchBookDescription(key),
    enabled: !!key,
    staleTime: 1000 * 60 * 60,
  });
};

export const useAuthorSearch = (name: string) => {
  return useQuery({
    queryKey: ["authors", name],
    queryFn: () => fetchAuthor(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  });
};
