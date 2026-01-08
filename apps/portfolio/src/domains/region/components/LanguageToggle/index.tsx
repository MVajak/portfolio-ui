import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'et', label: 'ET' },
] as const;

export function LanguageToggle() {
  const { i18n } = useTranslation();
  // Handle locale codes like "et-EE" by extracting base language
  const currentLang = i18n.language.split('-')[0];

  return (
    <div className="glass backdrop-blur-xl flex items-center gap-1 rounded-full p-1">
      {languages.map((lang) => {
        const isActive = currentLang === lang.code;
        return (
          <motion.button
            key={lang.code}
            type="button"
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`relative rounded-full px-3 py-1.5 text-body-default-bold transition-colors ${
              isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="language-indicator"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{lang.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
