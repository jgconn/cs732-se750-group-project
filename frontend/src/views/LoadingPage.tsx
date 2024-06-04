import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingPageProps {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const LoadingPage = ({ className, children }: LoadingPageProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center gap-8 self-center content-center justify-self-center',
        className,
      )}
    >
      <Loader2 className='h-12 w-12 animate-spin' />
      {children}
    </div>
  );
};
