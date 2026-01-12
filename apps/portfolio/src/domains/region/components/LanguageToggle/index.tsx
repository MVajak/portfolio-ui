import { useTranslation } from 'react-i18next';

import { ToggleGroup, ToggleGroupItem } from '@portfolio/ui';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'et', label: 'ET' },
] as const;

export function LanguageToggle() {
  const { i18n } = useTranslation();
  // Handle locale codes like "et-EE" by extracting base language
  const currentLang = i18n.language.split('-')[0];

  return (
    <ToggleGroup
      type="single"
      value={currentLang}
      onValueChange={(value) => {
        if (value) void i18n.changeLanguage(value);
      }}
      variant="glass"
      animated
    >
      {languages.map((lang) => (
        <ToggleGroupItem key={lang.code} value={lang.code}>
          {lang.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
