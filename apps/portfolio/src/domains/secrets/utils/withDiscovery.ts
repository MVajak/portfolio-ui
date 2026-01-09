import {useCallback} from 'react';

import type {SecretId} from '../data/secrets';
import {useDiscoveryStore} from '@/domains/secrets';

/**
 * Hook that returns a wrapper function to track secret discovery.
 * Use this to wrap handlers that should mark a secret as discovered when triggered.
 */
export function useWithDiscovery() {
  const { discoverSecret } = useDiscoveryStore();

  return useCallback(
      <T extends SecretId>(id: T, handler: () => void) => {
          return () => {
              discoverSecret(id);
              handler();
          };
      },
      [discoverSecret]
  );
}
