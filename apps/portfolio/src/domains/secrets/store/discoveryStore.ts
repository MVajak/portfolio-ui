import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {type SecretId, secretCommands, secretKeys} from '../data/secrets';

interface DiscoveryState {
  discoveredSecrets: SecretId[];
  discoverSecret: (id: SecretId) => boolean; // returns true if newly discovered
  isDiscovered: (id: SecretId) => boolean;
  discoveredCount: () => number;
  totalCount: () => number;
  reset: () => void;
}

export const useDiscoveryStore = create<DiscoveryState>()(
  persist(
    (set, get) => ({
      discoveredSecrets: [],

      discoverSecret: (id) => {
        const { discoveredSecrets } = get();
        if (discoveredSecrets.includes(id)) {
          return false;
        }
        set({ discoveredSecrets: [...discoveredSecrets, id] });
        return true;
      },

      isDiscovered: (id) => get().discoveredSecrets.includes(id),

      discoveredCount: () => get().discoveredSecrets.length,

      totalCount: () => secretCommands.length + secretKeys.length, // +1 for konami (not in spotlight)

      reset: () => set({ discoveredSecrets: [] }),
    }),
    {
      name: 'portfolio-secrets-discovery',
    }
  )
);
