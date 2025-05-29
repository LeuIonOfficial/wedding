'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getBackgroundColor, getInitials } from '@/lib/utils';

interface PartyProps {
  party: {
    title: string;
    subtitle: string;
    bridesmaids: {
      title: string;
      members: {
        name: string;
        role: string;
        image?: string;
        message: string;
        backgroundColor?: string;
      }[];
    };
    groomsmen: {
      title: string;
      members: {
        name: string;
        role: string;
        image?: string;
        message: string;
        backgroundColor?: string;
      }[];
    };
  };
}

export default function Party({ party }: PartyProps) {
  // Animation for section title
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation for bridesmaids title
  const [bridesmaidsTitleRef, bridesmaidsTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation for groomsmen title
  const [groomsTitleRef, groomsTitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Card flip state
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Toggle card flip
  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="party" className="py-16 md:py-24 bg-primary-50">
      <div className="container-custom">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif mb-2">{party.title}</h2>
          <p className="text-primary-500 max-w-2xl mx-auto">{party.subtitle}</p>
        </motion.div>

        {/* Bridesmaids */}
        <motion.div
          ref={bridesmaidsTitleRef}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={bridesmaidsTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center font-serif mb-8">{party.bridesmaids.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {party.bridesmaids.members.map((member, index) => {
              const [itemRef, itemInView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              const cardId = `bridesmaid-${index}`;
              const isFlipped = flippedCards[cardId] || false;
              const backgroundColor = getBackgroundColor(member.backgroundColor);

              return (
                <motion.div
                  key={index}
                  ref={itemRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-80"
                >
                  <div 
                    className={`relative w-full h-full transition-transform duration-700 transform-gpu ${
                      isFlipped ? 'rotate-y-180' : ''
                    } cursor-pointer perspective-1000`}
                    onClick={() => toggleFlip(cardId)}
                  >
                    {/* Front of card */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                        <div className="relative h-48 w-full">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div
                              className="h-full w-full flex items-center justify-center"
                              style={{ backgroundColor }}
                            >
                              <span className="text-white text-4xl font-serif">
                                {getInitials(member.name)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-grow">
                          <h4 className="font-serif text-xl">{member.name}</h4>
                          <p className="text-accent">{member.role}</p>
                          <p className="text-sm text-primary-500 mt-2">
                            (Tap card to read message)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div 
                      className="absolute inset-0 backface-hidden rotate-y-180"
                      style={{ backgroundColor }}
                    >
                      <div className="p-6 h-full flex items-center justify-center">
                        <div className="text-center">
                          <h4 className="font-serif text-xl text-white mb-4">{member.name}</h4>
                          <p className="text-white italic">&ldquo;{member.message}&rdquo;</p>
                          <p className="text-white/70 text-sm mt-4">
                            (Tap to flip back)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Groomsmen */}
        <motion.div
          ref={groomsTitleRef}
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={groomsTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center font-serif mb-8">{party.groomsmen.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {party.groomsmen.members.map((member, index) => {
              const [itemRef, itemInView] = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              const cardId = `groomsman-${index}`;
              const isFlipped = flippedCards[cardId] || false;
              const backgroundColor = getBackgroundColor(member.backgroundColor);

              return (
                <motion.div
                  key={index}
                  ref={itemRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-80"
                >
                  <div 
                    className={`relative w-full h-full transition-transform duration-700 transform-gpu ${
                      isFlipped ? 'rotate-y-180' : ''
                    } cursor-pointer perspective-1000`}
                    onClick={() => toggleFlip(cardId)}
                  >
                    {/* Front of card */}
                    <div className="absolute inset-0 backface-hidden">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                        <div className="relative h-48 w-full">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div
                              className="h-full w-full flex items-center justify-center"
                              style={{ backgroundColor }}
                            >
                              <span className="text-white text-4xl font-serif">
                                {getInitials(member.name)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-grow">
                          <h4 className="font-serif text-xl">{member.name}</h4>
                          <p className="text-accent">{member.role}</p>
                          <p className="text-sm text-primary-500 mt-2">
                            (Tap card to read message)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div 
                      className="absolute inset-0 backface-hidden rotate-y-180"
                      style={{ backgroundColor }}
                    >
                      <div className="p-6 h-full flex items-center justify-center">
                        <div className="text-center">
                          <h4 className="font-serif text-xl text-white mb-4">{member.name}</h4>
                          <p className="text-white italic">&ldquo;{member.message}&rdquo;</p>
                          <p className="text-white/70 text-sm mt-4">
                            (Tap to flip back)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}