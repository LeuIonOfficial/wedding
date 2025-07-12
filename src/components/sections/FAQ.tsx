"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaChevronDown, FaEnvelope } from "react-icons/fa";
import { getBackgroundColor } from "@/lib/utils";

interface FAQProps {
	faq: {
		title: string;
		subtitle: string;
		questions: {
			question: string;
			answer: string;
		}[];
		contact: {
			title: string;
			message: string;
			email: string;
		};
		backgroundColor: string;
	};
}

export default function FAQ({ faq }: FAQProps) {
	// Track which questions are open
	const [openQuestions, setOpenQuestions] = useState<Record<number, boolean>>(
		{}
	);

	// Toggle question open/closed
	const toggleQuestion = (index: number) => {
		setOpenQuestions((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	// Animation for section title
	const [titleRef, titleInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	// Animation for contact section
	const [contactRef, contactInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const backgroundColor = getBackgroundColor(faq.backgroundColor);

	return (
		<section
			id="faq"
			className="py-16 md:py-24"
			style={{ backgroundColor }}
		>
			<div className="container-custom max-w-4xl">
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
					<h2 className="font-serif mb-2">{faq.title}</h2>
					<p className="text-primary-700 max-w-2xl mx-auto">
						{faq.subtitle}
					</p>
				</motion.div>

				{/* Questions */}
				<div className="space-y-4 mb-16">
					{faq.questions.map((item, index) => {
						const [questionRef, questionInView] = useInView({
							triggerOnce: true,
							threshold: 0.1,
						});

						const isOpen = openQuestions[index] || false;

						return (
							<motion.div
								key={index}
								ref={questionRef}
								initial={{ opacity: 0, y: 10 }}
								animate={
									questionInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 10 }
								}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								className="bg-white rounded-lg shadow-sm overflow-hidden"
							>
								<button
									onClick={() => toggleQuestion(index)}
									className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
								>
									<h4 className="font-medium text-lg">
										{item.question}
									</h4>
									<motion.div
										animate={{ rotate: isOpen ? 180 : 0 }}
										transition={{ duration: 0.3 }}
									>
										<FaChevronDown className="text-accent" />
									</motion.div>
								</button>

								<motion.div
									initial={false}
									animate={{
										height: isOpen ? "auto" : 0,
										opacity: isOpen ? 1 : 0,
									}}
									transition={{ duration: 0.3 }}
									className="overflow-hidden"
								>
									<div className="px-6 pb-4 text-primary-600">
										{item.answer}
									</div>
								</motion.div>
							</motion.div>
						);
					})}
				</div>

				{/* Contact */}
				<motion.div
					ref={contactRef}
					initial={{ opacity: 0, y: 20 }}
					animate={
						contactInView
							? { opacity: 1, y: 0 }
							: { opacity: 0, y: 20 }
					}
					transition={{ duration: 0.6 }}
					className="bg-white p-8 rounded-lg shadow-md text-center"
				>
					<h3 className="font-serif text-2xl mb-4">
						{faq.contact.title}
					</h3>
					<p className="text-primary-600 mb-6">
						{faq.contact.message}
					</p>
					<a
						href={`mailto:${faq.contact.email}`}
						className="inline-flex items-center text-accent hover:underline"
					>
						<FaEnvelope className="mr-2" />
						{faq.contact.email}
					</a>
				</motion.div>
			</div>
		</section>
	);
}
