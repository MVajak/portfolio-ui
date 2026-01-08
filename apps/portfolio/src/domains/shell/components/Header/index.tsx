import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Search } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { useSpotlightStore } from '../../../portfolio';
import { LanguageToggle } from '../../../region';
import { ThemeToggle } from '../../../theme';
import { navItems } from '../../data/navigation';
import { SocialLinks } from './components/SocialLinks';

export function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const openSpotlight = useSpotlightStore((state) => state.open);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      <header className="fixed top-0 right-0 left-0 z-50 md:right-20 md:left-20">
        <nav className="glass mx-4 mt-4 rounded-full px-4 py-2 backdrop-blur-xl md:mx-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/initials_logo.png" alt="MKV" className="h-8 w-auto" />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  className="text-body-default-bold text-muted-foreground transition-colors hover:text-foreground"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(`nav.${item.key}`)}
                </motion.a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden items-center gap-4 md:flex">
              <motion.button
                type="button"
                onClick={openSpotlight}
                className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 text-body-small text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="h-4 w-4" />
                <span>{t('spotlight.search', 'Search')}</span>
                <kbd className="flex items-center gap-0.5 rounded bg-background/50 px-1.5 py-0.5 text-body-small">
                  {/* 17px to match the size of K */}
                  <span className="text-[17px]">⌘</span>
                  <span>K</span>
                </kbd>
              </motion.button>
              <div className="h-6 w-px bg-border" />
              <SocialLinks />
              <div className="h-6 w-px bg-border" />
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              className="glass-hover flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-xl md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 text-foreground" />
              ) : (
                <Bars3Icon className="h-5 w-5 text-foreground" />
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="glass mx-4 mt-2 rounded-2xl p-6 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-foreground text-title-small-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ))}
                <div className="my-2 h-px bg-border" />
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSpotlight();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl bg-muted/50 px-3 py-2.5 text-body-default text-muted-foreground"
                >
                  <Search className="h-5 w-5" />
                  <span>{t('spotlight.search', 'Search')}</span>
                </button>
                <div className="my-2 h-px bg-border" />
                <div className="flex items-center justify-between">
                  <SocialLinks />
                  <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
