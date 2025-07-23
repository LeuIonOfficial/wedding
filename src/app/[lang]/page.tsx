import { notFound } from "next/navigation";
import { Lang } from "@/types";

// Components
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Event from "@/components/sections/Event";
import RSVP from "@/components/sections/RSVP";
import Registry from "@/components/sections/Registry";
import FAQ from "@/components/sections/FAQ";
import { getTranslation } from "@/lib/getTranslations";
import { extractGuestNames } from "@/lib/urlUtils";

// Types for page props
type PageProps = {
	params: {
		lang: string;
	};
	searchParams: {
		guests?: string | string[];
	};
};

// Generate static params for all supported languages
export async function generateStaticParams() {
	return [{ lang: "en" }, { lang: "ru" }, { lang: "ro" }];
}

export default async function Home({ params, searchParams }: PageProps) {
	// Validate language parameter
	if (!["en", "ru", "ro"].includes(params.lang)) {
		notFound();
	}

	const lang = params.lang as Lang;
	const content = await getTranslation(lang);

	// Process guest names from URL parameters using utility function
	const guestNames = extractGuestNames(searchParams);

	return (
		<main>
			<Hero hero={content.hero} guestName={guestNames} />
			<Story story={content.story} />
			<Event event={content.event} />
			<RSVP rsvp={content.rsvp} />
			<Registry registry={content.registry} />
			<FAQ faq={content.faq} />
		</main>
	);
}
