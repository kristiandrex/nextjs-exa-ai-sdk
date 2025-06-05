import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchResult } from "@/lib/schemas";
import { isWorthWriteMore } from "@/lib/classifiers";
import { ExternalLink, TextCursor } from "lucide-react";

type SearchResultCardProps = Readonly<{
  result: SearchResult;
}>;

export function SearchResultCard({ result }: SearchResultCardProps) {
  const worthWriteMore = isWorthWriteMore(result);

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
          {worthWriteMore && <TextCursor className="h-5 w-5 text-gray-500" />}

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
