"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGift, FaExternalLinkAlt } from "react-icons/fa";
import { getBackgroundColor } from "@/lib/utils";

interface RegistryProps {
  registry: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      description: string;
      url: string;
      image?: string;
      backgroundColor?: string;
    }[];
  };
}

export default function Registry({ registry }: RegistryProps) {
  // Animation for section title
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="registry" className="py-16 md:py-24">
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
          <p className="text-primary-500 max-w-2xl mx-auto">
            {registry.subtitle}
          </p>
        </motion.div>

        {/* Registry Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {registry.items.map((item, index) => {
            const [itemRef, itemInView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            const backgroundColor = getBackgroundColor(item.backgroundColor);

            return (
              <motion.div
                key={index}
                ref={itemRef}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {item.image ? (
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="h-48 w-full flex items-center justify-center"
                    style={{ backgroundColor }}
                  >
                    <FaGift size={40} className="text-white" />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="font-serif text-xl mb-2">{item.name}</h4>
                  <p className="text-primary-600 mb-4">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent hover:text-accent-dark transition-colors duration-300"
                  >
                    <span className="mr-2">Visit Registry</span>
                    <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
