export interface Recommendation {
	id: string;
	name: string;
	role: string;
	company: string;
	relationship: string;
	date: string;
	text: string;
	avatar?: string;
}

export const recommendations: Recommendation[] = [
	{
		id: "taago-kilter",
		name: "Taago Kilter",
		role: "Senior Product Manager",
		company: "Katana Cloud Inventory",
		relationship: "Was senior to Mihkel",
		date: "May 2025",
		text: "As a product manager, I always appreciate engineers who are driven to fully understand the impact they are delivering, not just do what is told. The impact delivered this way is always more meaningful. Mihkel has all it takes to fulfill that role. But at the same time, with him, there's always the right balance of asking questions and finding answers by himself; he intuitively knows what problems can only be solved by business decisions and where he can validate things with fellow engineers. This is often a hidden strength of an engineer, but it makes or breaks the efficiency and time used to deliver the most impact. I never felt overwhelmed or needed to guide him in areas where he could find answers. While he never forgot to align his findings. Mihkel could easily enter unfamiliar territory and navigate his way through it by collaborating with people who had the answers, never seemingly getting stuck. I guess he just found alternative paths where one path was a dead end, yet somehow he always managed to come up with a solid plan. In my opinion, Mihkel is a mature teammate who is critical when he needs to be, yet constructive always. Whether it's code writing or ideating solutions for holistic challenges and leading other teammates in delivering solutions, he would be a go-to person to battle any challenge with.",
	},
	{
		id: "kerdo-kullamae",
		name: "Kerdo Kullamäe",
		role: "Engineering Manager",
		company: "Katana Cloud Inventory",
		relationship: "Managed Mihkel directly",
		date: "May 2025",
		text: "Mihkel is an exceptional talent and a team player, and I had the privilege of being both his teammate and team lead for over a year. What consistently stood out was his proactiveness and his remarkable \"get-it-done\" attitude. No matter how complex the problem, Mihkel approached it with determination and always went above and beyond to deliver results or provide clarity. One of his key strengths is his willingness to seek input when navigating unfamiliar territory. Rather than getting stuck, he actively reached out, which not only accelerated his own growth but also contributed significantly to the team's progress. Combining a strong work ethic, deep technical knowledge, and a genuinely humble personality, Mihkel is the kind of person any team would be fortunate to work with.",
	},
	{
		id: "vladimir-g",
		name: "Vladimir G.",
		role: "Engineering Team Lead",
		company: "Katana Cloud Inventory",
		relationship: "Managed Mihkel directly",
		date: "May 2025",
		text: "I had the pleasure of leading Mihkel for nearly two years, during which he consistently impressed me with his dedication, passion, and rapid growth as a Full-Stack Engineer. He joined our team as a Mid-Level Developer and immediately dove into learning our technologies and best practices with exceptional enthusiasm. What stood out early on was his eagerness not just to learn, but to contribute meaningfully — he quickly became a strong advocate and representative of our team's best practices, actively promoting them both within the team and across other departments. His proactive nature, combined with a readiness to step in wherever help was needed, made him an invaluable team member. Mihkel is also an exceptional human being — kind, positive, empathetic, and equipped with a great sense of humor that lifted the team's spirits. His collaborative attitude and emotional intelligence created a welcoming and productive environment for everyone around him. His growth into a Senior Developer felt natural and well-earned. He not only matured technically but also took on more leadership responsibilities, such as leading epics and mentoring others. He consistently went the extra mile to ensure not only his own growth but the success of the entire team. It was a genuine privilege to lead, support, and learn alongside someone as talented and driven as Mihkel. I have no doubt he will continue to make a tremendous impact wherever he goes.",
	},
	{
		id: "ivan-ojiambo",
		name: "Ivan Ojiambo",
		role: "Senior Software Engineer",
		company: "Katana Cloud Inventory",
		relationship: "Worked on the same team",
		date: "April 2025",
		text: "I had the privilege of collaborating with Mihkel on the PAF team, where he consistently demonstrated a strong work ethic and a proactive, go-getter mentality. He approaches every task with meticulous attention to detail and conducts exceptionally thorough code reviews. Mihkel is always approachable and ready to jump on a call to help troubleshoot any issue, which speaks to his collaborative spirit. Beyond his technical strengths, he brings a wonderful sense of humor that keeps the team motivated. Any organization would be fortunate to have Mihkel on board.",
	},
];
