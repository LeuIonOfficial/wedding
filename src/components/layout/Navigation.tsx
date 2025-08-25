"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Lang } from "@/types";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { getLanguageName } from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface NavigationProps {
  navigation: {
    story: string;
    event: string;
    rsvp: string;
    registry: string;
    faq: string;
  };
  lang: Lang;
}

export default function Navigation({ navigation, lang }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window?.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      // Close menu if open when scrolling
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window?.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, isOpen]);

  const menuItems = [
    { key: "story", label: navigation.story },
    { key: "event", label: navigation.event },
    { key: "rsvp", label: navigation.rsvp },
    { key: "registry", label: navigation.registry },
    { key: "faq", label: navigation.faq },
  ];

  const getLinkWithParams = (path: string) => {
    return `${path}`;
  };

  const changeLanguage = (newLang: Lang) => {
    if (newLang === lang) return;
    
    const pathAfterLang = pathname.split('/').slice(2).join('/');
    const params = searchParams.toString();
    const newPath = `/${newLang}${pathAfterLang ? `/${pathAfterLang}` : ''}${params ? `?${params}` : ''}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  const languages: Lang[] = ['en', 'ru', 'ro'];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-sm shadow-sm border-b" : "bg-transparent"
      )}
    >
      <div className="container-custom py-4 flex justify-between items-center">
        <Link
          href={getLinkWithParams(`/${lang}`)}
          className="text-xl font-cursive tracking-wide z-50 text-foreground"
        >
          IT
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuLink
                  href={getLinkWithParams(`/${lang}#${item.key}`)}
                  className="text-sm hover:text-primary focus:text-primary transition-colors duration-300 bg-transparent text-foreground"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem className="ml-6">
              <LanguageSwitcher currentLang={lang} />
            </NavigationMenuItem>
            <NavigationMenuItem className="ml-2">
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden z-50 text-2xl transition-transform duration-300 hover:scale-110"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaBars />
              </motion.div>
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full sm:w-full max-w-none bg-background border-0 p-0"
          >
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-foreground hover:scale-110 transition-transform duration-200"
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Navigation content */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-6 pb-6">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.1 + index * 0.1,
                      type: "spring",
                      stiffness: 100 
                    }}
                  >
                    <Link
                      href={getLinkWithParams(`/${lang}#${item.key}`)}
                      className="text-2xl font-serif text-foreground hover:text-primary transition-colors duration-300 block text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {/* Language Selector - Mobile */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + menuItems.length * 0.1 + 0.2 }}
                  className="mt-8"
                >
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-3">Language</p>
                    <div className="flex justify-center gap-2">
                      {languages.map((langOption) => (
                        <button
                          key={langOption}
                          onClick={() => changeLanguage(langOption)}
                          className={cn(
                            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            langOption === lang 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                          )}
                        >
                          {getLanguageName(langOption)}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
