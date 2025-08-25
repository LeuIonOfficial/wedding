"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Countdown from "react-countdown";
import { FaChevronDown } from "react-icons/fa";
import {
  getCoupleNames,
  getWeddingDate,
  getWeddingLocation,
  getWeddingDateTime,
} from "@/lib/utils";
import { Lang } from "@/types";

interface HeroProps {
  hero: {
    scrollCta: string;
  };
  guestName?: string;
  lang: Lang;
}

export default function Hero(props: HeroProps) {
  const { hero, lang } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Get localized greeting
  const getLocalizedGreeting = (language: Lang): string => {
    switch (language) {
      case 'ru':
        return 'Дорогие';
      case 'ro':
        return 'Dragii noștri';
      case 'en':
      default:
        return 'Welcome';
    }
  };

  // Hardcoded values
  const backgroundImage = "/images/hero/№999_686-2.JPG";
  const backgroundColor = "#fdf2f2";
  const names = getCoupleNames();
  const date = getWeddingDate();
  const location = getWeddingLocation();
  const weddingDate = getWeddingDateTime();
  const countdownLabels = {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Countdown renderer
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return null;
    }

    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {[
          { value: days, label: countdownLabels.days },
          { value: hours, label: countdownLabels.hours },
          { value: minutes, label: countdownLabels.minutes },
          { value: seconds, label: countdownLabels.seconds },
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-xl sm:text-2xl md:text-4xl font-serif text-white">
              {item.value}
            </div>
            <div className="text-xxs sm:text-xs md:text-sm text-white/90">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-primary"
    >
      <Image
        src={backgroundImage}
        alt="Wedding background"
        fill
        priority
        className={`object-cover transition-opacity duration-1000 ${
          imageLoaded ? "opacity-80" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-cursive text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 text-white drop-shadow-lg">
            {names}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-4"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-serif text-white drop-shadow-md">
            {date}
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md">
            {location}
          </p>
        </motion.div>

        {props.guestName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-5 max-w-4xl mx-auto"
          >
            <div className="bg-background/90 text-foreground border border-border px-4 py-3 sm:px-6 sm:py-4 rounded-lg backdrop-blur-sm shadow-lg">
              <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-center break-words hyphens-auto">
                {getLocalizedGreeting(lang)}, {props.guestName}!
              </h2>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-12"
        >
          {isClient && <Countdown date={weddingDate} renderer={renderer} />}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <a
          href="#story"
          className="inline-flex flex-col text-white/90 items-center text-xs mb-8 sm:text-sm"
          aria-label={hero.scrollCta}
        >
          <span className="mb-2">{hero.scrollCta}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaChevronDown />
          </motion.div>
        </a>
      </motion.div>
    
    </section>
  );
}
