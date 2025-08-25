"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface StoryProps {
  story: {
    title: string;
    subtitle: string;
    timeline: {
      title: string;
      description: string;
    }[];
  };
}

// Hardcoded timeline data
const timelineImages = [
  "/images/story/1.JPG", // 2022 - First Meeting
  "/images/story/2.JPG", // 2023 - Growing Closer
  "/images/story/3.JPG", // 2024 - The Proposal
];

const timelineYears = ["2022", "2023", "2024"];
const timelineColors = ["#fdf2f2", "#fefdfb", "#fdf2f2"];

// Define image positioning for each timeline image
const imagePositions = [
  "object-center",     // 2022 - Center the image
  "object-center",        // 2023 - Show top part of image  
  "object-top",     // 2024 - Center the image
];

export default function Story({ story }: StoryProps) {
  // Fade-in animation for section title
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="story" className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif mb-2 text-foreground">{story.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{story.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-0">
            {story.timeline.map((item, index) => {
              const [itemRef, itemInView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              const isEven = index % 2 === 0;
              const backgroundColor = timelineColors[index];
              const timelineImage = timelineImages[index];
              const imagePosition = imagePositions[index];
              const year = timelineYears[index];

              return (
                <div key={index} ref={itemRef} className="relative">
                  <motion.div
                    className={`flex flex-col md:flex-row ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.1 * index,
                    }}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-2 border-primary bg-card hidden md:block"
                      style={{ top: "3rem" }}
                    />

                    {/* Year marker */}
                    <div
                      className={`md:w-1/2 pb-8 md:pt-10 pt-0 md:pb-0 ${
                        isEven ? "md:pl-12" : "md:pr-12"
                      } flex ${isEven ? "md:justify-start" : "md:justify-end"}`}
                    >
                      <div className="bg-primary text-primary-foreground py-2 px-6 rounded-full inline-block h-fit font-medium">
                        {year}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"}`}
                    >
                      <div className="bg-card rounded-lg shadow-md overflow-hidden">
                        {timelineImage && (
                          <div className="relative h-[450px] w-full">
                            <Image
                              src={timelineImage}
                              alt={item.title}
                              fill
                              className={`object-cover ${imagePosition}`}
                            />
                            {/* Text overlay at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                              <h4 className="font-serif mb-2 text-white text-xl">
                                {item.title}
                              </h4>
                              <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        )}
                        {!timelineImage && (
                          <div
                            className="h-80 w-full flex flex-col items-center justify-center p-6"
                            style={{
                              backgroundColor,
                            }}
                          >
                            <h4 className="font-serif mb-4 text-primary text-2xl text-center">
                              {item.title}
                            </h4>
                            <p className="text-primary/80 text-center">{item.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
