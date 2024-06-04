import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Box = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'bg-tertiary p-2 px-5 rounded-md min-w-14 text-center text-white ',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export { Box };
