"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RegistryProps {
  registry: {
    title: string;
    subtitle: string;
  };
}

export default function Registry({ registry }: RegistryProps) {
  // Animation for section title
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="registry"
      className="py-16 md:py-24 bg-background-primary text-black"
    >
      <div className="container-custom">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif mb-2">{registry.title}</h2>
          <p className="text-black max-w-2xl mx-auto">{registry.subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
}
