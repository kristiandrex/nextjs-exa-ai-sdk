"use server";

import Exa from "exa-js";
import { FormState } from "@/types/form";
import { searchResultsSchema } from "@/lib/schemas";

const exa = new Exa(process.env.EXA_API_KEY);

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
      };
    }

    const response = await exa.searchAndContents(query, {
      text: true,
      summary: {
        query:
          'You are a professional journalist investigating relevant topics for your upcoming articles. Read the text (or URL) I provide and write a single paragraph stating the central theme of the article. Do not include any phrases referencing the source (e.g., "The article is about..." "Esta publicación habla sobre..." or equivalent in any language); instead, directly present the topic itself. The response must always be in Spanish, and you must use correct Spanish orthography, including tildes, ñ and other special characters.',
      },
    });

    const validationResult = searchResultsSchema.safeParse(response.results);

    if (!validationResult.success) {
      console.error(validationResult.error);

      return {
        error: "Hubo un error al procesar los resultados",
        results: [],
      };
    }

    return { results: validationResult.data, error: null };
  } catch (error) {
    console.error(error);

    return {
      error:
        "Lo sentimos, hubo un problema al realizar la búsqueda. Por favor, intenta de nuevo.",
      results: [],
    };
  }
}
