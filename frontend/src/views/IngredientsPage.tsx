import { Filters } from '@/components/Filters';
import { IngredientSelection } from '@/components/IngredientSelection';
import { AddIngredient } from '@/components/AddIngredient';
import { WeatherSearchBar } from '@/components/WeatherSearchBar';
import { useState } from 'react';
import { LoadingPage } from './LoadingPage';
import { cn } from '@/lib/utils';

export const IngredientsPage = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className={cn('flex h-full w-full flex-col flex-1 items-center bg-primary-500', isLoading && 'justify-center')}>
      {isLoading ? (
      <LoadingPage className='bg-primary-500'>
        <h1 className='text-3xl font-medium'>Loading your Recipes</h1>
      </LoadingPage>
      ) : (
        <div className='flex h-full w-11/12 flex-col justify-center gap-4 bg-primary-500 py-8 md:flex-row'>
          <IngredientSelection />
          <div className='flex flex-[1] flex-col gap-4'>
            <AddIngredient />
            <WeatherSearchBar/>
            <Filters setLoading={setLoading} />
          </div>
        </div>
      )}
    </div>
  );
};
