import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = streamText({
    model: openai("gpt-4o"),
    system: process.env.CHAT_SYSTEM_PROMPT,
    messages,
  });

  return stream.toDataStreamResponse();
}
