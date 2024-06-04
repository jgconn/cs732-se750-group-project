import { useContext, useEffect, useRef, useState } from 'react';
import { SearchBar } from './SearchBar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { UserContext } from '@/hooks/UserContextProvider';
import { Ingredient } from '@/types/interfaces';
import { API_BASE_URL } from '@/types/constants';
import useGet from '@/hooks/useGet';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';


export const AddIngredient = () => {
  const { searchText, addIngredient } = useContext(UserContext);
  const [ingredientsMatching, setIngredientsMatching] = useState<Ingredient[]>(
    [],
  );
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState(100);
  const { toast } = useToast();

  // On mount add listener to handle click outside of suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !inputRef.current?.contains(event.target as Node) &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: ingredients, refresh } = useGet(
    `${API_BASE_URL}/ingredients/containing/${searchText}`,
    [],
  );

  // Refresh ingredients when searchText changes
  useEffect(() => {
    refresh();
  }, [searchText]);

  useEffect(() => {
    if (ingredients) {
      setIngredientsMatching(ingredients);
    }
  }, [ingredients]);

  // Dynamically calculate maximum height for suggestions div
  useEffect(() => {
    if (isExpanded && suggestionsRef.current) {
      setMaxHeight(
        window.innerHeight - suggestionsRef.current.getBoundingClientRect().top,
      );
    }
  }, [isExpanded, searchText]);

  // Handle "Add" button click
  const handleAddClick = () => {
    if (selectedIngredient) {
      addIngredient(selectedIngredient);
      toast({
        variant: 'successful',
        title: 'Ingredient added',
        description: 'The ingredient has been added to your list',
        duration: 3000,
      });
    }
  };

  return (
    <div className='flex justify-center'>
      <Card className='h-fit w-full bg-secondary p-4 text-white'>
        <CardHeader className='mb-4 flex flex-col'>
          <CardTitle className='text-3xl'>Search</CardTitle>
          <CardDescription className='text-white'>
            Search for additional ingredients
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col justify-center'>
          <SearchBar
            searchBarRef={inputRef}
            onFocus={() => setIsExpanded(true)}
            inPlaceholder='Search'
            data-testid="searchIngredient"
          >
            {isExpanded && ingredientsMatching?.length ? (
              <div
                className='absolute left-0 top-full z-50 mt-1 w-full overflow-y-auto rounded-lg bg-white px-0 py-2'
                ref={suggestionsRef}
                style={{ maxHeight: `${maxHeight - 20}px` }}
              >
                {ingredientsMatching.map((ingredient: Ingredient) => (
                  <div
                    key={ingredient.id}
                    className='block cursor-pointer px-4 py-2 hover:bg-neutral-100'
                    onClick={() => {
                      setIsExpanded(false);
                      setSelectedIngredient(ingredient);
                    }}
                  >
                    {ingredient.name}
                  </div>
                ))}
              </div>
            ) : null}
          </SearchBar>
          {selectedIngredient ? (
            <span className='mt-2'>
              Selected ingredient: {selectedIngredient.name}
            </span>
          ) : null}
          <Button
            className='mx-auto mt-4 w-full bg-tertiary hover:bg-tertiary/80'
            size='lg'
            type='submit'
            disabled={!selectedIngredient}
            onClick={handleAddClick}
            data-testid="searchSubmit"
          >
            Add
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
