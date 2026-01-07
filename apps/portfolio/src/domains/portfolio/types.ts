export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  nameKey: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  isWorkProject?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  roleKey: string;
  startDate: string;
  endDate?: string;
  descriptionKey: string;
  achievements?: string[];
  technologies: string[];
  type: 'professional' | 'leadership' | 'entrepreneurship' | 'other';
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  yearsOfExperience: number;
  projectsCompleted: number;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startYear: number;
  endYear: number;
}

export interface Language {
  language: string;
  level: string;
}
