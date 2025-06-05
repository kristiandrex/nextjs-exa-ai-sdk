"use server";

import Exa from "exa-js";
import { searchResultsSchema, type SearchResult } from "@/lib/schemas";
import { FormState } from "@/types/form";

const exa = new Exa(process.env.EXA_API_KEY);

function sortResultsByScore(results: SearchResult[]): SearchResult[] {
  return results.slice().sort((a, b) => {
    const scoreA = a.score ?? 0;
    const scoreB = b.score ?? 0;
    return scoreB - scoreA;
  });
}

export async function search(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const query = formData.get("search") as string;

    if (!query.trim()) {
      return {
        error: "Por favor, ingresa algo para buscar",
        results: [],
        query: "",
      };
    }

    const response = await exa.searchAndContents(query, {
      text: true,
      type: "auto",
      summary: {
        query: process.env.EXA_SUMMARY_PROMPT,
      },
    });

    const validationResult = searchResultsSchema.safeParse(response.results);

    if (!validationResult.success) {
      console.error(validationResult.error);

      return {
        error: "Hubo un error al procesar los resultados",
        results: [],
        query: "",
      };
    }

    const sortedResults = sortResultsByScore(validationResult.data);

    return { results: sortedResults, error: null, query };
  } catch (error) {
    console.error(error);

    return {
      error:
        "Lo sentimos, hubo un problema al realizar la búsqueda. Por favor, intenta de nuevo.",
      results: [],
      query: "",
    };
  }
}
