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
const pageSize = 20;

const fetchBooks = async (
  query: string,
  subject: string[] = [],
  page: number = 1,
  sort: string = "Relevance",
  lang: string = "All",
): Promise<BookSearchResponse> => {
  const langConvert = {
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
    Italian: "it",
    Swedish: "sv",
  };
  if (lang in langConvert) {
    lang = langConvert[lang as keyof typeof langConvert];
  }

  let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=${pageSize}&fields=key,title,author_name,cover_i,subject,author_key,first_publish_year,number_of_pages_median,isbn`;

  if (sort !== "Relevance") {
    url += `&sort=${encodeURIComponent(sort.toLowerCase())}`;
  }
  if (lang !== "All") {
    url += `&lang=${encodeURIComponent(lang.toLowerCase())}`;
  }

  if (subject.length > 0) {
    subject.forEach((sub) => {
      url += `&subject=${encodeURIComponent(sub.toLowerCase())}`;
    });
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  const data = await response.json();
  return data;
};

const fetchAuthor = async (key: string): Promise<Author> => {
  const response = await fetch(`https://openlibrary.org/authors/${key}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch author");
  }
  const data = await response.json();
  return data;
};

const fetchSingleBookByIsbn = async (isbn: string): Promise<Book | null> => {
  const url = `https://openlibrary.org/search.json?q=isbn:${encodeURIComponent(
    isbn,
  )}&limit=1&fields=key,title,author_name,cover_i,subject,author_key,first_publish_year,number_of_pages_median,isbn`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch book by ISBN");
  }
  const data = await response.json();
  return data.docs[0] ?? null;
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

export const useBookSearch = (
  query: string,
  subject: string[] = [],
  page: number = 1,
  sort: string = "Relevance",
  lang: string = "All",
) => {
  return useQuery({
    queryKey: ["books", query, subject, page, sort, lang],
    queryFn: () => fetchBooks(query, subject, page, sort, lang),
    enabled: query.length > 0,

    staleTime: 1000 * 60 * 5,
  });
};

export const useBookByIsbn = (isbn: string) => {
  return useQuery({
    queryKey: ["bookByIsbn", isbn],
    queryFn: () => fetchSingleBookByIsbn(isbn),
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

export const useAuthorDetail = (key: string) => {
  return useQuery({
    queryKey: ["authors", key],
    queryFn: () => fetchAuthor(key),
    enabled: !!key,
    staleTime: 1000 * 60 * 5,
  });
};
