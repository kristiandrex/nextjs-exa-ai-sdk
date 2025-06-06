"use client";

import { Button } from "@/components/ui/button";
import { SearchResult } from "@/lib/schemas";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChatContext } from "@/contexts/ChatContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";

type ArticleGeneratorProps = Readonly<{
  result: SearchResult;
}>;

type Attachment = {
  name: string;
  contentType: string;
  url: string;
};

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

  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleStartChat() {
    append({
      role: "user",
      content: result.summary,
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setUrl("");
    }
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);

    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleGenerateFromInput(e: React.FormEvent) {
    e.preventDefault();

    if (url) {
      append({
        role: "user",
        content: `Generar artículo a partir de la URL: ${url}`,
      });
    } else if (selectedFile) {
      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            const base64String = reader.result as string;
            resolve(base64String);
          };

          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });

        const attachment: Attachment = {
          name: selectedFile.name,
          contentType: selectedFile.type,
          url: base64,
        };

        append({
          role: "user",
          content: "Genera el artículo a partir de la imagen",
          experimental_attachments: [attachment],
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (messages.length === 0) {
    return (
      <div className="mt-4 pt-4 border-t space-y-4">
        <form onSubmit={handleGenerateFromInput} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL del artículo</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://ejemplo.com/articulo"
              value={url}
              onChange={handleUrlChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">O sube una imagen</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={!url && !selectedFile}>
              Generar desde URL/Imagen
            </Button>
            <Button type="button" onClick={handleStartChat}>
              Generar desde resumen
            </Button>
          </div>
        </form>
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
