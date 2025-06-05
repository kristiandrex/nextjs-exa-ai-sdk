"use client";

import { Send, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  status: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
}

export function ChatInput({
  input,
  status,
  onInputChange,
  onSubmit,
  onStop,
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="mt-4 flex gap-2">
      <Input
        value={input}
        onChange={onInputChange}
        placeholder="Escribe tu mensaje..."
        disabled={status === "streaming"}
      />
      {status === "streaming" ? (
        <Button type="button" onClick={onStop}>
          <StopCircle className="h-4 w-4 mr-2" />
          Detener
        </Button>
      ) : (
        <Button type="submit" disabled={!input.trim()}>
          <Send className="h-4 w-4 mr-2" />
          Enviar
        </Button>
      )}
    </form>
  );
}
