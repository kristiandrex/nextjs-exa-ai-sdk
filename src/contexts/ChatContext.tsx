"use client";

import { createContext, useContext } from "react";
import { useChat } from "@ai-sdk/react";

type ChatContextType = ReturnType<typeof useChat>;

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const chat = useChat({
    api: "/api/generate-article",
  });

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }

  return context;
}
