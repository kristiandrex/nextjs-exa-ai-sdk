import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";

import { titleSchema } from "@/lib/schemas";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { query, count = 3 } = await req.json();

  const result = streamObject({
    model: openai("gpt-4o-mini"),
    schema: titleSchema,
    prompt: `Genera ${count} títulos alternativos en español para un artículo sobre: "${query}". Los títulos deben ser atractivos y relevantes para el tema.`,
  });

  return result.toTextStreamResponse();
}
