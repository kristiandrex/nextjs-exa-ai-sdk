import { SearchResult } from "@/lib/schemas";

export type FormState =
  | { results: SearchResult[]; error: null }
  | { results: SearchResult[]; error: string };
