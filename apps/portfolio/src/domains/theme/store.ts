import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

const getSystemTheme = (): Theme => {
	if (typeof window === "undefined") return "light";
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const applyTheme = (theme: Theme) => {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	if (theme === "dark") {
		root.classList.add("dark");
	} else {
		root.classList.remove("dark");
	}
};

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: getSystemTheme(),
			setTheme: (theme: Theme) => {
				applyTheme(theme);
				set({ theme });
			},
			toggleTheme: () => {
				const newTheme = get().theme === "light" ? "dark" : "light";
				applyTheme(newTheme);
				set({ theme: newTheme });
			},
		}),
		{
			name: "portfolio-theme",
			onRehydrateStorage: () => (state) => {
				if (state) {
					applyTheme(state.theme);
				}
			},
		},
	),
);
