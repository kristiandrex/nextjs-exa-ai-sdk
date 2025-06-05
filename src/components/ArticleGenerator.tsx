"use client";

import { Button } from "@/components/ui/button";
import { SearchResult } from "@/lib/schemas";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChatContext } from "@/contexts/ChatContext";

type ArticleGeneratorProps = Readonly<{
  result: SearchResult;
}>;

export function ArticleGenerator({ result }: ArticleGeneratorProps) {
  const {
    messages,
    status,
    error,
    append,
    stop,
    input,
    handleInputChange,
    handleSubmit,
  } = useChatContext();

  function handleStartChat() {
    append({
      role: "user",
      content: result.summary,
    });
  }

  if (messages.length === 0) {
    return (
      <div className="mt-4 pt-4 border-t">
        <Button onClick={handleStartChat}>Generar artículo</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      {error && (
        <p className="text-sm text-red-500 mb-4">
          Hubo un error al generar el artículo. Por favor, intenta de nuevo.
        </p>
      )}
      <div className="flex-1 overflow-y-auto mb-4">
        <ChatMessages messages={messages} />
      </div>
      <div className="mt-auto">
        <ChatInput
          input={input}
          status={status}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onStop={stop}
        />
      </div>
    </div>
  );
}
