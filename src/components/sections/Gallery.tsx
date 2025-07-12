"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaTimes } from "react-icons/fa";
import { getBackgroundColor } from "@/lib/utils";

interface GalleryProps {
	gallery: {
		title: string;
		subtitle: string;
		photos: {
			alt: string;
			caption: string;
			backgroundColor?: string;
		}[];
	};
}

// Hardcoded photos array
const galleryPhotos = [
	{
		src: "/images/hero/№999_1-2.JPG",
		alt: "Ion and Tatiana together",
		caption: "The beginning of forever",
		backgroundColor: "#eeeeee",
	},
	{
		src: "/images/hero/№999_79.JPG",
		alt: "A tender moment",
		caption: "In your eyes, I found my home",
		backgroundColor: "#cccccc",
	},
	{
		src: "/images/hero/№999_184-2.JPG",
		alt: "Sharing laughter",
		caption: "You make me smile like no one else",
		backgroundColor: "#f5f5f5",
	},
	{
		src: "/images/hero/№999_233-2.JPG",
		alt: "Close together",
		caption: "Two hearts, one soul",
		backgroundColor: "#ffffff",
	},
	{
		src: "/images/hero/№999_237-2.JPG",
		alt: "A quiet moment",
		caption: "Perfect in its simplicity",
		backgroundColor: "#222222",
	},
	{
		src: "/images/hero/№999_430-2.JPG",
		alt: "Looking ahead",
		caption: "Our future together",
		backgroundColor: "#eeeeee",
	},
	{
		src: "/images/hero/№999_446-2.JPG",
		alt: "Pure joy",
		caption: "Happiness is being with you",
		backgroundColor: "#cccccc",
	},
	{
		src: "/images/hero/№999_686-2.JPG",
		alt: "Timeless love",
		caption: "Forever starts now",
		backgroundColor: "#444444",
	},
];

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
		document.body.style.overflow = "hidden";
	};

	// Close lightbox
	const closeLightbox = () => {
		setSelectedImage(null);
		document.body.style.overflow = "auto";
	};

	return (
		<section id="gallery" className="py-16 md:py-24">
			<div className="container-custom">
				{/* Section title */}
				<motion.div
					ref={titleRef}
					className="text-center mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={
						titleInView
							? { opacity: 1, y: 0 }
							: { opacity: 0, y: 20 }
					}
					transition={{ duration: 0.6 }}
				>
					<h2 className="font-serif mb-2">{gallery.title}</h2>
					<p className="text-primary-500 max-w-2xl mx-auto">
						{gallery.subtitle}
					</p>
				</motion.div>

				{/* Masonry Gallery */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{galleryPhotos.map((photo, index) => {
						const [itemRef, itemInView] = useInView({
							triggerOnce: true,
							threshold: 0.1,
						});

						const backgroundColor = getBackgroundColor(
							photo.backgroundColor
						);

						return (
							<motion.div
								key={index}
								ref={itemRef}
								initial={{ opacity: 0, y: 20 }}
								animate={
									itemInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="cursor-pointer overflow-hidden rounded-lg shadow-md"
								onClick={() => openLightbox(index)}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className="relative h-64 w-full">
									<Image
										src={photo.src}
										alt={photo.alt}
										fill
										className="object-cover"
									/>
									<div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
										<p className="text-white text-sm">
											{photo.caption}
										</p>
									</div>
								</div>
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
							<div className="relative h-full w-full">
								<Image
									src={galleryPhotos[selectedImage].src}
									alt={galleryPhotos[selectedImage].alt}
									fill
									className="object-contain"
								/>
							</div>
							<div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
								<p className="text-white text-center">
									{galleryPhotos[selectedImage].caption}
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</section>
	);
}
