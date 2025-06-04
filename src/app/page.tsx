"use client";

import { AlertCircle } from "lucide-react";
import { useActionState, useId } from "react";

import { SearchResultCard } from "@/components/SearchResultCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormState } from "@/types/form";

import { search } from "./actions";

const initialState: FormState = {
  results: [],
  error: null,
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(search, initialState);
  const formId = useId();

  return (
    <main className="container mx-auto min-h-screen py-8">
      <div className="max-w-lg mx-auto">
        <Card className="w-full">
          <CardHeader>
            <h1 className="text-4xl font-bold text-center">Hermes</h1>
          </CardHeader>
          <CardContent>
            <form action={formAction} id={formId}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="search">¿Qué quieres investigar?</Label>
                  <Textarea
                    id="search"
                    name="search"
                    required
                    disabled={isPending}
                    placeholder="Escribe tu consulta aquí..."
                  />
                </div>
                {state.error && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{state.error}</p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              form={formId}
            >
              {isPending ? "Buscando..." : "Investigar"}
            </Button>
          </CardFooter>
        </Card>

        {state.results.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Resultados:</h2>
            <div className="grid gap-4">
              {state.results.map((result) => (
                <SearchResultCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
