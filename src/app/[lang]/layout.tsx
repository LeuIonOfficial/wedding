import { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { Lang } from "@/types";
import { getTranslation } from "@/lib/getTranslations";
import Navigation from "@/components/layout/Navigation";
import { Suspense } from "react";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
};

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  // Validate language parameter
  if (!["en", "ru", "ro"].includes(params.lang)) {
    return {
      title: "Not Found",
      description: "The page you requested was not found.",
    };
  }

  // Load translations for metadata
  const content = await getTranslation(params.lang as Lang);

  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function LangLayout({ children, params }: LayoutProps) {
  // Validate language
  if (!["en", "ru", "ro"].includes(params.lang)) {
    notFound();
  }

  const lang = params.lang as Lang;
  const content = await getTranslation(lang);

  return (
    <>
      {/* Remove fixed LanguageSwitcher from layout, now in menu bar */}
      <Suspense fallback={null}>
        <Navigation navigation={content.navigation} lang={lang} />
        </Suspense>
      <main>{children}</main>
      <Footer footer={content.footer} />
    </>
  );
}
