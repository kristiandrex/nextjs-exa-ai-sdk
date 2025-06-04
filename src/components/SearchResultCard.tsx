import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SearchResult } from "@/lib/schemas";
import { ExternalLink } from "lucide-react";

type SearchResultCardProps = Readonly<{
  result: SearchResult;
}>;

export function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{result.title}</h3>
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="Abrir enlace"
        >
          <ExternalLink className="h-5 w-5" />
        </a>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{result.summary}</p>
      </CardContent>
    </Card>
  );
}
