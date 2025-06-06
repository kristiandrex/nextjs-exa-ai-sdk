import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { titleSchema, TitleSchema } from "@/lib/schemas";

interface TitleGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTitle: (title: string) => void;
  currentQuery: string;
}

export function TitleGeneratorModal({
  isOpen,
  onClose,
  onSelectTitle,
  currentQuery,
}: TitleGeneratorModalProps) {
  const [titleCount, setTitleCount] = useState(3);

  const { object, submit, isLoading } = useObject<TitleSchema>({
    api: "/api/generate-titles",
    schema: titleSchema,
  });

  function handleGenerate() {
    submit({ query: currentQuery, count: titleCount });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Generar títulos alternativos</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Número de títulos:</span>
            <Select
              value={titleCount.toString()}
              onValueChange={(value) => setTitleCount(parseInt(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="3" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              "Generar títulos"
            )}
          </Button>

          {object?.titles && (
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {object.titles.map((title, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left whitespace-normal h-auto py-2"
                  onClick={() => {
                    if (typeof title === "string") {
                      onSelectTitle(title);
                      onClose();
                    }
                  }}
                >
                  {title}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
