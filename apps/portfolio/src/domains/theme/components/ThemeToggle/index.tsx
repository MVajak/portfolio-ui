import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { useThemeStore } from "../../store";

export function ThemeToggle() {
	const { theme, toggleTheme } = useThemeStore();

	return (
		<motion.button
			type="button"
			onClick={toggleTheme}
			className="relative flex h-10 w-10 items-center justify-center rounded-full glass-hover"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			<motion.div
				initial={false}
				animate={{
					rotate: theme === "dark" ? 180 : 0,
					scale: theme === "dark" ? 0 : 1,
				}}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="absolute"
			>
				<SunIcon className="h-5 w-5 text-foreground" />
			</motion.div>
			<motion.div
				initial={false}
				animate={{
					rotate: theme === "light" ? -180 : 0,
					scale: theme === "light" ? 0 : 1,
				}}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="absolute"
			>
				<MoonIcon className="h-5 w-5 text-foreground" />
			</motion.div>
		</motion.button>
	);
}
