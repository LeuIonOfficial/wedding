'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTimes } from 'react-icons/fa';
import { getBackgroundColor } from '@/lib/utils';

interface GalleryProps {
  gallery: {
    title: string;
    subtitle: string;
    photos: {
      src?: string;
      alt: string;
      caption: string;
      backgroundColor?: string;
    }[];
  };
}

export default function Gallery({ gallery }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Animation for section title
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Open lightbox
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container-custom">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif mb-2">{gallery.title}</h2>
          <p className="text-primary-500 max-w-2xl mx-auto">{gallery.subtitle}</p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.photos.map((photo, index) => {
            const [itemRef, itemInView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            const backgroundColor = getBackgroundColor(photo.backgroundColor);

            return (
              <motion.div
                key={index}
                ref={itemRef}
                initial={{ opacity: 0, y: 20 }}
                animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="cursor-pointer overflow-hidden rounded-lg shadow-md"
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {photo.src ? (
                  <div className="relative h-64 w-full">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                      <p className="text-white text-sm">{photo.caption}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="h-64 w-full flex items-center justify-center relative"
                    style={{ backgroundColor }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-white font-serif text-xl">{photo.caption}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white p-2 text-2xl z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <FaTimes />
            </button>

            <div
              className="relative max-w-4xl w-full h-[80vh] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {gallery.photos[selectedImage].src ? (
                <div className="relative h-full w-full">
                  <Image
                    src={gallery.photos[selectedImage].src!}
                    alt={gallery.photos[selectedImage].alt}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div
                  className="h-full w-full flex items-center justify-center"
                  style={{ backgroundColor: getBackgroundColor(gallery.photos[selectedImage].backgroundColor) }}
                >
                  <p className="text-white font-serif text-3xl p-6 text-center">
                    {gallery.photos[selectedImage].caption}
                  </p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                <p className="text-white text-center">
                  {gallery.photos[selectedImage].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}