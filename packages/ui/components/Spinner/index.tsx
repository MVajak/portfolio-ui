import { LoaderIcon } from 'lucide-react';

import { cn } from '@portfolio/ui/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return <LoaderIcon className={cn('size-4 animate-spin', className)} {...props} />;
}

export { Spinner };
