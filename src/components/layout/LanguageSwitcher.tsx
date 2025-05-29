'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lang } from '@/types';
import { getLanguageName } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLang: Lang;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const languages: Lang[] = ['en', 'ru', 'ro'];
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (lang: Lang) => {
    if (lang === currentLang) {
      setIsOpen(false);
      return;
    }

    // Get the path after the language code
    const pathAfterLang = pathname.split('/').slice(2).join('/');
    const newPath = `/${lang}${pathAfterLang ? `/${pathAfterLang}` : ''}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-xs md:text-sm"
        aria-label={`Change language from ${getLanguageName(currentLang)}`}
      >
        <span className="hidden md:inline">{getLanguageName(currentLang)}</span>
        <span className="md:hidden inline uppercase font-medium">{currentLang}</span>
        <svg
          className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-28 md:w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <motion.button
                  key={lang}
                  whileHover={{ backgroundColor: '#f8f9fa' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => changeLanguage(lang)}
                  className={`w-full text-left px-3 py-2 text-xs md:text-sm md:px-4 ${
                    lang === currentLang ? 'bg-primary-100 text-accent font-medium' : 'text-primary-700'
                  }`}
                >
                  <span className="hidden md:inline">{getLanguageName(lang)}</span>
                  <span className="md:hidden inline uppercase font-medium">{lang}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}