import { Lang, TranslationContent } from "@/types";
import en from "../../public/locales/en/content.json";
import ro from "../../public/locales/ro/content.json";
import ru from "../../public/locales/ru/content.json";

const translations: Record<string, TranslationContent> = {
  en,
  ro,
  ru,
};

export async function getTranslation(lang: Lang): Promise<TranslationContent> {
  // Return statically imported translation, fallback to 'en' if not found
  return translations[lang] || translations["en"];
}
