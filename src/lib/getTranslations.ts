import { Lang, TranslationContent } from "@/types";

export async function getTranslation(lang: Lang): Promise<TranslationContent> {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.VERCEL_URL || "http://localhost:3000" // fallback for local dev
      : "";

  try {
    const response = await fetch(
      new URL(`/locales/${lang}/content.json`, baseUrl).toString()
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${lang} translation`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading translation:", error);

    const fallbackResponse = await fetch(
      new URL(`/locales/en/content.json`, baseUrl).toString()
    );
    return await fallbackResponse.json();
  }
}
