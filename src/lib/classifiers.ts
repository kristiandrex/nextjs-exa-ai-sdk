import { SearchResult } from "./schemas";

export function isWorthWriteMore(result: SearchResult): boolean {
  const score = result.score ?? 0;

  // Valor escogido basado en las pruebas hechas
  return score > 0.3;
}
