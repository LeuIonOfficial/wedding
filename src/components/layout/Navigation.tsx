"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Lang } from "@/types";
import LanguageSwitcher from "./LanguageSwitcher";

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
  const [scrollPosition, setScrollPosition] = useState(0);

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

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);

      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = "100%";
    } else if (scrollPosition > 0) {
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restore scroll position after a small delay
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 0);
    } else {
      // Just unlock if no scroll position to restore
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen, scrollPosition]);

  const toggleMenu = () => setIsOpen(!isOpen);

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div
          className={`container-custom py-4 flex justify-between items-center ${
            isOpen && "overscroll-none"
          }`}
        >
          <Link
            href={getLinkWithParams(`/${lang}`)}
            className="text-xl font-cursive tracking-wide z-50 text-black"
          >
            J & J
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={getLinkWithParams(`/${lang}#${item.key}`)}
                    className="text-sm hover:text-accent-active focus:text-accent-active transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-6">
              <LanguageSwitcher currentLang={lang} />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 text-2xl"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center z-40"
                style={{ height: "100vh", height: "100dvh" }}
              >
                <nav>
                  <ul className="flex flex-col items-center space-y-6">
                    {menuItems.map((item) => (
                      <motion.li
                        key={item.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1 * menuItems.indexOf(item),
                        }}
                      >
                        <Link
                          href={getLinkWithParams(`/${lang}#${item.key}`)}
                          className="text-xl font-serif hover:text-black transition-colors duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-8 flex justify-center">
                    <LanguageSwitcher currentLang={lang} />
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
