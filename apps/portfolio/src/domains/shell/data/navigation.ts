import { Briefcase, Code, FolderOpen, Home, Mail, Quote, User } from 'lucide-react';

export const navItems = [
  { key: 'hero', href: '#hero', id: 'hero', icon: Home },
  { key: 'about', href: '#about', id: 'about', icon: User },
  { key: 'skills', href: '#skills', id: 'skills', icon: Code },
  { key: 'projects', href: '#projects', id: 'projects', icon: FolderOpen },
  { key: 'experience', href: '#experience', id: 'experience', icon: Briefcase },
  { key: 'testimonials', href: '#testimonials', id: 'testimonials', icon: Quote },
  { key: 'contact', href: '#contact', id: 'contact', icon: Mail },
] as const;

export type NavItem = (typeof navItems)[number];
