import type { ReactNode } from 'react';
import { toast } from 'sonner';

type ToastType = 'default' | 'loading' | 'success' | 'warning' | 'error';

export interface ToastStep {
  message: string;
  type?: ToastType;
  description?: ReactNode;
}

export interface ToastSequenceOptions {
  steps: ToastStep[];
  finalToast?: ToastStep;
  delay?: number;
  /** If true, shows one toast at a time (dismisses previous before next). Default: false (stacking) */
  sequential?: boolean;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showToast(step: ToastStep): string | number {
  const { message, type = 'default', description } = step;

  switch (type) {
    case 'loading':
      return toast.loading(message, { description });
    case 'success':
      return toast.success(message, { description, duration: 3000 });
    case 'warning':
      return toast.warning(message, { description });
    case 'error':
      return toast.error(message, { description });
    default:
      return toast(message, { description });
  }
}

export async function runToastSequence(options: ToastSequenceOptions): Promise<void> {
  const { steps, finalToast, delay = 800, sequential = false } = options;
  const ids: (string | number)[] = [];

  for (const step of steps) {
    if (sequential && ids.length > 0) {
      toast.dismiss(ids[ids.length - 1]);
    }
    const id = showToast(step);
    ids.push(id);
    await sleep(delay);
  }

  if (sequential && ids.length > 0) {
    toast.dismiss(ids[ids.length - 1]);
  } else {
    for (const id of ids) {
      toast.dismiss(id);
    }
  }

  if (finalToast) {
    showToast(finalToast);
  }
}
