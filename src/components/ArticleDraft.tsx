"use client";

import { useMemo } from "react";
import { useChatContext } from "@/contexts/ChatContext";

export function ArticleDraft() {
  const { messages } = useChatContext();

  const lastAssistantMessage = useMemo(
    () => messages.findLast((message) => message.role === "assistant"),
    [messages]
  );

  if (!lastAssistantMessage) return null;

  return (
    <div className="h-[calc(100vh-16rem)] overflow-y-auto">
      <div className="prose prose-xl max-w-none">
        <div className="whitespace-pre-wrap text-lg leading-relaxed">
          {lastAssistantMessage.content}
        </div>
      </div>
    </div>
  );
}
