"use client";
import { useEffect, useState } from "react";
import { TranslationContent, Lang } from "@/types";
import { getTranslation } from "@/lib/getTranslations";

export function useTranslation(lang: Lang) {
  const [content, setContent] = useState<TranslationContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTranslation = async () => {
      try {
        setLoading(true);
        const data = await getTranslation(lang);
        setContent(data);
        setError(null);
      } catch (err) {
        console.error("Error in useTranslation:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    loadTranslation();
  }, [lang]);

  return { content, loading, error };
}
