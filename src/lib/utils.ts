import { Lang } from "@/types";

export function getBackgroundColor(
  color?: string,
  fallback: string = "#E8C4C4",
): string {
  return color || fallback;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
}

export function getCountdownDate(dateString: string): Date {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If can't parse, return a future date (1 year from now)
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      return futureDate;
    }
    return date;
  } catch (e) {
    // Default to a future date if parsing fails
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    return futureDate;
  }
}

export function getLanguageName(lang: Lang): string {
  const langMap: Record<Lang, string> = {
    en: "English",
    ru: "Русский",
    ro: "Română",
  };

  return langMap[lang] || "English";
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

// Wedding-specific utility functions
export function getWeddingDate(): string {
  return "May 30, 2026";
}

export function getWeddingDateFormatted(): string {
  return "30.05.2026";
}

export function getWeddingDateTime(): Date {
  return new Date("2026-05-30T17:00:00");
}

export function getWeddingLocation(): string {
  return "Tesalia, Ialoveni";
}

export function getCoupleNames(): string {
  return "Ion & Tatiana";
}

export function getCeremonyTime(): string {
  return "5:00 PM";
}

export function getReceptionTime(): string {
  return "6:00 PM";
}

export function getWeddingAddress(): string {
  return "Tesalia\nIaloveni";
}
