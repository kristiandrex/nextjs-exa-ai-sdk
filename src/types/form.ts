import { SearchResult } from "@/lib/schemas";

export type FormState =
  | { results: SearchResult[]; error: null; query: string }
  | { results: SearchResult[]; error: string; query: string };
