import { Section } from "@/domains/shell";
import { AboutBio } from "./components/AboutBio";
import { AboutStats } from "./components/AboutStats";

export function AboutSection() {
	return (
		<Section id="about">
			<div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
				<AboutBio />
				<AboutStats />
			</div>
		</Section>
	);
}
