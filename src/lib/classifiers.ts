import { SearchResult } from "./schemas";

export function isWorthExpanding(result: SearchResult): boolean {
  const score = result.score ?? 0;
  return score > 0.3;
}
