"use client";

import { Card, CardContent } from "./ui/card";
import { UIMessage } from "ai";

type Props = Readonly<{
  lastMessage: UIMessage;
}>;

export function ArticleDraft({ lastMessage }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="h-[calc(100vh-16rem)] overflow-y-auto">
          <div className="prose prose-xl max-w-none">
            <div className="whitespace-pre-wrap text-lg leading-relaxed">
              {lastMessage.content}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
