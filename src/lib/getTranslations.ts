import { Lang, TranslationContent } from "@/types";

export async function getTranslation(lang: Lang): Promise<TranslationContent> {
  try {
    const response = await fetch(
      `http://localhost:3000/locales/${lang}/content.json`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${lang} translation`);
    }
    return response.json();
  } catch (error) {
    console.error("Error loading translation:", error);
    // Fallback to English if translation fails
    const fallbackResponse = await fetch(
      "http://localhost:3000/locales/en/content.json",
    );

    return fallbackResponse.json();
  }
}
