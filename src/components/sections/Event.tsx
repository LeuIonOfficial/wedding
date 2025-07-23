"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import {
  getWeddingDate,
  getCeremonyTime,
  getReceptionTime,
  getWeddingAddress,
} from "@/lib/utils";

interface EventProps {
  event: {
    title: string;
    subtitle: string;
    ceremony: {
      title: string;
      description: string;
    };
    reception: {
      title: string;
      description: string;
    };
  };
}

export default function Event({ event }: EventProps) {
  // Hardcoded event data
  const ceremonyData = {
    date: getWeddingDate(),
    time: getCeremonyTime(),
    address: getWeddingAddress(),
    image: "/images/event/ceremony.jpg",
    backgroundColor: "#E8C4C4",
  };

  const receptionData = {
    date: getWeddingDate(),
    time: getReceptionTime(),
    address: getWeddingAddress(),
    image: "/images/event/reception.jpg",
    backgroundColor: "#D4C4A8",
  };

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sus!4v1622839304757!5m2!1sen!2sus";
  const contactEmail = "johnandjanewedding@example.com";
  // Animation refs
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ceremonyRef, ceremonyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [receptionRef, receptionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mapRef, mapInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Format address with line breaks
  const formatAddress = (address: string) => {
    return address.split("\n").map((line, i) => (
      <span key={i} className="block">
        {line}
      </span>
    ));
  };

  return (
    <section id="event" className="py-16 md:py-24 bg-background-secondary">
      <div className="container-custom">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif mb-2 text-charcoal">{event.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{event.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Ceremony */}
          <motion.div
            ref={ceremonyRef}
            initial={{ opacity: 0, x: -30 }}
            animate={
              ceremonyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {ceremonyData.image ? (
              <div className="relative h-64 w-full">
                <Image
                  src={ceremonyData.image}
                  alt={event.ceremony.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-64 w-full flex items-center justify-center bg-white">
                <h3 className="text-white font-serif text-2xl">
                  {event.ceremony.title}
                </h3>
              </div>
            )}
            <div className="p-6">
              <h3 className="font-serif text-2xl mb-4">
                {event.ceremony.title}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FaCalendarAlt className="text-charcoal mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{ceremonyData.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-charcoal mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{ceremonyData.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-charcoal mt-1 mr-3" />
                  <div>
                    <p className="font-medium">
                      {formatAddress(ceremonyData.address)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p>{event.ceremony.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div
            ref={receptionRef}
            initial={{ opacity: 0, x: 30 }}
            animate={
              receptionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {receptionData.image ? (
              <div className="relative h-64 w-full">
                <Image
                  src={receptionData.image}
                  alt={event.reception.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="h-64 w-full flex items-center justify-center"
                style={{ backgroundColor: receptionData.backgroundColor }}
              >
                <h3 className="text-white font-serif text-2xl">
                  {event.reception.title}
                </h3>
              </div>
            )}
            <div className="p-6">
              <h3 className="font-serif text-2xl mb-4">
                {event.reception.title}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FaCalendarAlt className="text-charcoal mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{receptionData.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-charcoal mt-1 mr-3" />
                  <div>
                    <p className="font-medium">{receptionData.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-charcoal mt-1 mr-3" />
                  <div>
                    <p className="font-medium">
                      {formatAddress(receptionData.address)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p>{event.reception.description}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, y: 30 }}
          animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="aspect-video w-full overflow-hidden rounded-lg shadow-md"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2723.031637713679!2d28.748059800000004!3d46.9610684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97f9b89cabfa3%3A0xadfb85b48357acaa!2sHincesti%20Hwy%20294%2C%20MD-6801%2C%20Ialoveni!5e0!3m2!1sen!2s!4v1748512801854!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{
              border: "none",
            }}
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
