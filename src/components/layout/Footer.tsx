"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaHeart, FaAngleUp } from "react-icons/fa";

interface FooterProps {
	footer: {
		message: string;
		names: string;
		date: string;
		copyright: string;
		social: {
			instagram: string;
			facebook: string;
		};
	};
}

export default function Footer({ footer }: FooterProps) {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled down
	if (typeof window !== "undefined") {
		const toggleVisibility = () => {
			if (window.pageYOffset > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="bg-primary-50 py-12 relative">
			<div className="container-custom">
				<div className="text-center mb-8">
					<p className="font-cursive text-2xl text-themegreen mb-2">
						{footer.message}
					</p>
					<h3 className="font-serif mb-1 text-primary-900">
						{footer.names}
					</h3>
					<p className="text-primary-500">{footer.date}</p>
				</div>

				<div className="flex justify-center space-x-4 mb-8">
					<a
						href={footer.social.instagram}
						target="_blank"
						rel="noopener noreferrer"
						className="text-themegreen hover:text-themegreen-dark transition-colors duration-300"
						aria-label="Instagram"
					>
						<FaInstagram size={24} />
					</a>
					<a
						href={footer.social.facebook}
						target="_blank"
						rel="noopener noreferrer"
						className="text-themegreen hover:text-themegreen-dark transition-colors duration-300"
						aria-label="Facebook"
					>
						<FaFacebook size={24} />
					</a>
				</div>

				<div className="text-center text-primary-500 text-sm">
					<p className="flex items-center justify-center gap-1">
						Made with <FaHeart className="text-themegreen" /> by the
						happy couple
					</p>
					<p className="mt-2">{footer.copyright}</p>
				</div>
			</div>

			{isVisible && (
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					whileHover={{ y: -5 }}
					onClick={scrollToTop}
					className="fixed bottom-6 right-6 p-3 bg-accent text-white rounded-full shadow-lg z-50"
					aria-label="Scroll to top"
				>
					<FaAngleUp size={20} />
				</motion.button>
			)}
		</footer>
	);
}
