"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Lang } from "@/types";

interface NavigationProps {
  navigation: {
    story: string;
    event: string;
    gallery: string;
    party: string;
    rsvp: string;
    registry: string;
    faq: string;
  };
  lang: Lang;
}

export default function Navigation({ navigation, lang }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle body scroll lock
  const toggleBodyScroll = useCallback((shouldLock: boolean) => {
    if (shouldLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { key: "story", label: navigation.story },
    { key: "event", label: navigation.event },
    { key: "gallery", label: navigation.gallery },
    { key: "party", label: navigation.party },
    { key: "rsvp", label: navigation.rsvp },
    { key: "registry", label: navigation.registry },
    { key: "faq", label: navigation.faq },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div
        className={`container-custom py-4 flex justify-between items-center ${isOpen && "overscroll-none"}`}
      >
        <Link
          href={`/${lang}`}
          className="text-xl font-cursive tracking-wide z-50"
        >
          J & J
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={`/${lang}#${item.key}`}
                  className="text-sm hover:text-accent transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
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
              className="fixed inset-0 bg-white flex flex-col items-center justify-center z-40"
            >
              <nav>
                <ul className="flex flex-col items-center space-y-6">
                  {menuItems.map((item) => (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * menuItems.indexOf(item) }}
                    >
                      <Link
                        href={`/${lang}#${item.key}`}
                        className="text-xl font-serif hover:text-accent transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
