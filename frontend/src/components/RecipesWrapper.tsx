import { cn } from "@/lib/utils"

interface RecipesWrapper {
    className?: string
    children: React.ReactNode | React.ReactNode[]
}

export const RecipesWrapper = ({ className, children }: RecipesWrapper) => {
    return (
        <div className={cn('flex h-full w-full flex-1 flex-col items-center bg-primary-500', className)}>
        <div className='flex w-11/12 flex-col gap-4 bg-primary-500 py-8 md:flex-row'>
            {children}
        </div>
      </div>
    )
}