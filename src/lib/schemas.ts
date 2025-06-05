import { z } from "zod/v4";

export const searchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  publishedDate: z.string().optional(),
  author: z.string().optional(),
  summary: z.string(),
  image: z.string().optional(),
  score: z.number().optional(),
});

export const searchResultsSchema = z.array(searchResultSchema, {
  error: "Los resultados deben ser una lista válida",
});

export type SearchResult = z.infer<typeof searchResultSchema>;
export type SearchResults = z.infer<typeof searchResultsSchema>;
