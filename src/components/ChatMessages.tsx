"use client";

import { UIMessage } from "ai";

interface ChatMessagesProps {
  messages: UIMessage[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg ${
            message.role === "user" ? "bg-blue-50 ml-8" : "bg-gray-50 mr-8"
          }`}
        >
          <div className="text-sm text-gray-500 mb-1">
            {message.role === "user" ? "Tú" : "Asistente"}
          </div>
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      ))}
    </div>
  );
}
