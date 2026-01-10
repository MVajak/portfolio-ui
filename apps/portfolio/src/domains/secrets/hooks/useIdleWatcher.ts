import { useCallback, useEffect, useRef } from 'react';

import { useDiscoveryStore } from '@/domains/secrets';

const IDLE_TIMEOUT = 2 * 60 * 1000; // 2 minutes

export function useIdleWatcher(onIdle: () => void) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasTriggeredRef = useRef(false);
  const { discoverSecret } = useDiscoveryStore();

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only set new timeout if we haven't triggered yet this session
    if (!hasTriggeredRef.current) {
      timeoutRef.current = setTimeout(() => {
        hasTriggeredRef.current = true;
        discoverSecret('idle');
        onIdle();
      }, IDLE_TIMEOUT);
    }
  }, [onIdle, discoverSecret]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    // Start the timer
    resetTimer();

    // Reset on activity
    for (const event of events) {
      document.addEventListener(event, resetTimer, { passive: true });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      for (const event of events) {
        document.removeEventListener(event, resetTimer);
      }
    };
  }, [resetTimer]);
}
