export * from "./types";

// Data exports first (to avoid circular dependency with components)
export { skills } from "./data/skills";
export { experience } from "./data/experience";
export { projects } from "./data/projects";
export { personalInfo, certifications, achievements, languages } from "./data/personal";
export { education } from "./data/education";
export { recommendations } from "./data/recommendations";
export type { Recommendation } from "./data/recommendations";

// Components last (they may import from data above)
export * from "./components";
