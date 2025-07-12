"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getBackgroundColor } from "@/lib/utils";

interface StoryProps {
	story: {
		title: string;
		subtitle: string;
		timeline: {
			year: string;
			title: string;
			description: string;
			backgroundColor?: string;
		}[];
	};
}

// Hardcoded timeline images
const timelineImages = [
	"/images/hero/№999_1-2.JPG", // 2019 - First Meeting
	"/images/hero/№999_79.JPG", // 2020 - Growing Closer
	"/images/hero/№999_233-2.JPG", // 2022 - Building Our Future
	"/images/hero/№999_446-2.JPG", // 2024 - The Proposal
];

export default function Story({ story }: StoryProps) {
	// Fade-in animation for section title
	const [titleRef, titleInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section id="story" className="py-16 md:py-24">
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
					<h2 className="font-serif mb-2">{story.title}</h2>
					<p className="text-primary-500 max-w-2xl mx-auto">
						{story.subtitle}
					</p>
				</motion.div>

				{/* Timeline */}
				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary-200 hidden md:block" />

					{/* Timeline items */}
					<div className="space-y-12 md:space-y-0">
						{story.timeline.map((item, index) => {
							const [itemRef, itemInView] = useInView({
								triggerOnce: true,
								threshold: 0.1,
							});

							const isEven = index % 2 === 0;
							const backgroundColor = getBackgroundColor(
								item.backgroundColor
							);
							const timelineImage = timelineImages[index];

							return (
								<div
									key={index}
									ref={itemRef}
									className="relative"
								>
									<motion.div
										className={`flex flex-col md:flex-row ${
											isEven ? "md:flex-row-reverse" : ""
										}`}
										initial={{ opacity: 0, y: 30 }}
										animate={
											itemInView
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 30 }
										}
										transition={{
											duration: 0.6,
											delay: 0.1 * index,
										}}
									>
										{/* Timeline dot */}
										<div
											className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-2 border-themegreen bg-white hidden md:block"
											style={{ top: "2rem" }}
										/>

										{/* Year marker */}
										<div
											className={`md:w-1/2 pb-8 md:pb-0 ${
												isEven ? "md:pl-12" : "md:pr-12"
											} flex ${
												isEven
													? "md:justify-start"
													: "md:justify-end"
											}`}
										>
											<div className="bg-themegreen text-white py-2 px-6 rounded-full inline-block font-medium">
												{item.year}
											</div>
										</div>

										{/* Content */}
										<div
											className={`md:w-1/2 ${
												isEven ? "md:pr-12" : "md:pl-12"
											}`}
										>
											<div className="bg-white rounded-lg shadow-md overflow-hidden">
												{timelineImage && (
													<div className="relative h-60 w-full">
														<Image
															src={timelineImage}
															alt={item.title}
															fill
															className="object-cover"
														/>
													</div>
												)}
												{!timelineImage && (
													<div
														className="h-40 w-full flex items-center justify-center"
														style={{
															backgroundColor,
														}}
													>
														<span className="text-white text-xl font-serif">
															{item.title}
														</span>
													</div>
												)}
												<div className="p-6">
													<h4 className="font-serif mb-2">
														{item.title}
													</h4>
													<p className="text-primary-600">
														{item.description}
													</p>
												</div>
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
