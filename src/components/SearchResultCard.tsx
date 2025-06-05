import { ExternalLink, TextCursor } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { isWorthWriteMore } from "@/lib/classifiers";
import { SearchResult } from "@/lib/schemas";

type SearchResultCardProps = Readonly<{
  result: SearchResult;
  query: string;
}>;

export function SearchResultCard({ result, query }: SearchResultCardProps) {
  const router = useRouter();
  const worthWriteMore = isWorthWriteMore(result);

  function handleGenerateArticle() {
    localStorage.setItem("selectedResult", JSON.stringify(result));
    localStorage.setItem("userQuery", query);
    router.push("/generate");
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">{result.title}</h3>
          <Badge variant={worthWriteMore ? "default" : "destructive"}>
            {worthWriteMore
              ? "Vale la pena expandir"
              : "No vale la pena expandir"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {worthWriteMore && (
            <Button
              onClick={handleGenerateArticle}
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
              title="Generar artículo"
            >
              <TextCursor className="h-5 w-5" />
            </Button>
          )}

          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="Abrir enlace"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{result.summary}</p>
      </CardContent>
    </Card>
  );
}
