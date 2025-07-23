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

interface HeroProps {
  hero: {
    scrollCta: string;
  };
  guestName?: string;
}

export default function Hero(props: HeroProps) {
  const { hero } = props;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hardcoded values
  const backgroundImage = "/images/hero/№999_686-2.JPG";
  const backgroundColor = "#f8f8f8";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: backgroundColor }}
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 via-primary-900/20 to-primary-900/40" />
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-cursive text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 text-primary-50 drop-shadow-lg">
            {names}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-4"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-serif text-primary-50 drop-shadow-md">
            {date}
          </p>
          <p className="text-base sm:text-lg md:text-xl text-primary-50/90 drop-shadow-md">
            {location}
          </p>
        </motion.div>

        {props.guestName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-5"
          >
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl mb-4">
              <span className="bg-primary-50/90 text-primary-900 px-6 py-3 rounded-lg backdrop-blur-sm shadow-lg">
                Welcome, {props.guestName}!
              </span>
            </h2>
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
          className="inline-flex flex-col items-center text-xs sm:text-sm"
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
      {/* Mobile scroll indicator (mouse) */}
      <div className="scroll-indicator block md:hidden">
        <span className="mouse">
          <span className="scroll"></span>
        </span>
        <p>{hero.scrollCta || "Scroll Down"}</p>
      </div>
    </section>
  );
}
