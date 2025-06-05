"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";

import { ArticleGenerator } from "@/components/ArticleGenerator";
import { SearchResult } from "@/lib/schemas";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArticleDraft } from "@/components/ArticleDraft";
import { ChatProvider } from "@/contexts/ChatContext";

export default function GeneratePage() {
  const router = useRouter();
  const [result, setResult] = useState<SearchResult | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedResult = localStorage.getItem("selectedResult");
    const storedQuery = localStorage.getItem("userQuery");

    if (!storedResult || !storedQuery) {
      router.push("/");
      return;
    }

    try {
      const parsedResult = JSON.parse(storedResult) as SearchResult;
      setResult(parsedResult);
      setQuery(storedQuery);
    } catch (error) {
      console.error(error);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <main className="container mx-auto min-h-screen py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </main>
    );
  }

  if (!result) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChatProvider>
            <Card>
              <CardHeader>
                <h1 className="text-2xl font-bold">{query}</h1>
              </CardHeader>
              <CardContent>
                <ArticleGenerator result={result} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Borrador</h2>
              </CardHeader>
              <CardContent>
                <ArticleDraft />
              </CardContent>
            </Card>
          </ChatProvider>
        </div>
      </div>
    </main>
  );
}
