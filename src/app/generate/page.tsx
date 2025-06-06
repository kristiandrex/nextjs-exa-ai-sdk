"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, TextCursor } from "lucide-react";

import { ArticleGenerator } from "@/components/ArticleGenerator";
import { SearchResult } from "@/lib/schemas";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArticleDraft } from "@/components/ArticleDraft";
import { useChatContext } from "@/contexts/ChatContext";
import { TitleGeneratorModal } from "@/components/TitleGeneratorModal";

export default function GeneratePage() {
  const [articleGeneration, setArticleGeneration] = useState<{
    result: SearchResult | null;
    query: string;
  }>({
    result: null,
    query: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);

  const router = useRouter();
  const { messages } = useChatContext();

  const lastAssistantMessage = useMemo(
    () => messages?.findLast((message) => message.role === "assistant"),
    [messages]
  );

  useEffect(() => {
    const storedArticle = localStorage.getItem("articleGeneration");

    if (!storedArticle) {
      router.push("/");
      return;
    }

    try {
      const parsedArticle = JSON.parse(storedArticle) as {
        result: SearchResult;
        query: string;
      };

      setArticleGeneration(parsedArticle);
    } catch (error) {
      console.error(error);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  function handleTitleSelect(newTitle: string) {
    setArticleGeneration((prev) => ({
      ...prev,
      query: newTitle,
    }));

    localStorage.setItem(
      "articleGeneration",
      JSON.stringify({
        ...articleGeneration,
        query: newTitle,
      })
    );
  }

  if (isLoading) {
    return (
      <main className="container mx-auto min-h-screen py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </main>
    );
  }

  if (!articleGeneration.result) {
    return null;
  }

  return (
    <main className="container mx-auto min-h-screen py-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a resultados
        </Button>

        <div
          className={`grid gap-8 ${
            lastAssistantMessage ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          }`}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {articleGeneration.query}
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsTitleModalOpen(true)}
                >
                  <TextCursor className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ArticleGenerator result={articleGeneration.result} />
            </CardContent>
          </Card>

          {lastAssistantMessage && (
            <ArticleDraft lastMessage={lastAssistantMessage} />
          )}
        </div>
      </div>

      <TitleGeneratorModal
        isOpen={isTitleModalOpen}
        onClose={() => setIsTitleModalOpen(false)}
        onSelectTitle={handleTitleSelect}
        currentQuery={articleGeneration.query}
      />
    </main>
  );
}
