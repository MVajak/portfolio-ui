import { Bug, Coffee, Dice5, Terminal, User } from 'lucide-react';

export const secretCommands = [
  { id: 'sudoHireMe', keywords: ['sudo', 'hire', 'me', 'job'], icon: Terminal, label: 'sudo hire me', shortcut: '🔐' },
  { id: 'coffee', keywords: ['coffee', 'caffeine', 'fuel'], icon: Coffee, label: 'coffee', shortcut: '☕' },
  { id: 'debug', keywords: ['debug', 'inspect', 'dev'], icon: Bug, label: 'debug', shortcut: '🔧' },
  { id: 'npmInstall', keywords: ['npm', 'install', 'yarn', 'pnpm'], icon: Terminal, label: 'npm install', shortcut: '📦' },
  { id: 'gitBlame', keywords: ['git', 'blame', 'who'], icon: Terminal, label: 'git blame', shortcut: '🔍' },
  { id: 'whoami', keywords: ['whoami', 'who', 'am', 'i', 'about'], icon: User, label: 'whoami', shortcut: '👤' },
  { id: 'random', keywords: ['random', 'surprise', 'lucky'], icon: Dice5, label: 'random', shortcut: '🎲' },
] as const;

export const secretKeys = [
  { id: 'konami' },
  { id: 'idle' },
] as const;

// Spotlight secret IDs (derived from secretCommands)
export type SpotlightSecretId = (typeof secretCommands)[number]['id'];
export type KeysSecretId = (typeof secretKeys)[number]['id'];

// All secret IDs (includes non-spotlight secrets like konami)
export type SecretId = SpotlightSecretId | KeysSecretId;
