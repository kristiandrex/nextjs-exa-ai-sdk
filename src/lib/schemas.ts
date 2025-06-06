import { z } from "zod";

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
  errorMap: () => ({ message: "Los resultados deben ser una lista válida" }),
});

export const titleSchema = z.object({
  titles: z.array(z.string()),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
export type SearchResults = z.infer<typeof searchResultsSchema>;
export type TitleSchema = z.infer<typeof titleSchema>;
