import { useCallback, useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function useKonamiCode(onActivate: () => void) {
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.code;

      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length);

        // Check if the sequence matches the Konami code
        if (newSequence.length === KONAMI_CODE.length && newSequence.every((k, i) => k === KONAMI_CODE[i])) {
          // Reset sequence and trigger callback
          setTimeout(() => {
            onActivate();
            setInputSequence([]);
          }, 0);
          return [];
        }

        return newSequence;
      });
    },
    [onActivate]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return inputSequence;
}
