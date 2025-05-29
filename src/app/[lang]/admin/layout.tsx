import { notFound } from "next/navigation";
import { Lang } from "@/types";
import { getTranslation } from "@/lib/getTranslations";

// Types for layout props
type LayoutProps = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
};

export default async function AdminLayout({ children, params }: LayoutProps) {
  // Validate language parameter
  if (!["en", "ru", "ro"].includes(params.lang)) {
    notFound();
  }

  const lang = params.lang as Lang;
  const content = await getTranslation(lang);

  return (
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
  );
}
