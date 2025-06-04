import { z } from "zod/v4";

export const searchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  publishedDate: z.string(),
  author: z.string(),
  text: z.string(),
  summary: z.string(),
  image: z.string(),
  favicon: z.string(),
  score: z.number().optional(),
});

export const searchResultsSchema = z.array(searchResultSchema, {
  error: "Los resultados deben ser una lista válida",
});

export type SearchResult = z.infer<typeof searchResultSchema>;
export type SearchResults = z.infer<typeof searchResultsSchema>;
