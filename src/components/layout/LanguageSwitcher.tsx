'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lang } from '@/types';
import { getLanguageName } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  currentLang: Lang;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const languages: Lang[] = ['en', 'ru', 'ro'];

  const changeLanguage = (lang: Lang) => {
    if (lang === currentLang) {
      return;
    }

    // Get the path after the language code
    const pathAfterLang = pathname.split('/').slice(2).join('/');
    // Preserve query params
    const params = searchParams.toString();
    const newPath = `/${lang}${pathAfterLang ? `/${pathAfterLang}` : ''}${params ? `?${params}` : ''}`;
    
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 md:gap-2 bg-background/80 backdrop-blur-sm border-border hover:bg-muted hover:border-border"
        >
          <span className="hidden md:inline">{getLanguageName(currentLang)}</span>
          <span className="md:hidden inline uppercase font-medium">{currentLang}</span>
          <svg
            className="w-3 h-3 md:w-4 md:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-28 md:w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`cursor-pointer ${
              lang === currentLang ? 'bg-muted text-foreground font-medium' : ''
            }`}
          >
            <span className="hidden md:inline">{getLanguageName(lang)}</span>
            <span className="md:hidden inline uppercase font-medium">{lang}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}