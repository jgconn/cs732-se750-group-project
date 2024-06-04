import { SetStateAction, useContext, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { UserContext } from '@/hooks/UserContextProvider';

interface SearchBarProps {
  searchBarRef?: React.RefObject<HTMLInputElement>;
  onFocus?: () => void;
  children?: React.ReactNode | React.ReactNode[];
  inPlaceholder: string;
  inValue?: string;
  onInChange?: (e: { target: { value: SetStateAction<string>; }; } ) => void;
  'data-testid'?: string;
}

export const SearchBar = ({
  searchBarRef,
  onFocus,
  children,
  inPlaceholder,
  inValue,
  onInChange,
  ...props
}: SearchBarProps) => {
  const { searchText, setSearchText } = useContext(UserContext);
  const [localSearchText, setLocalSearchText] = useState(searchText);
  const debouncedSetSearchText = useDebounce((text: string) => {
    setSearchText(text);
  }, 500);

  useEffect(() => {
    debouncedSetSearchText(localSearchText);
  }, [localSearchText]);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLocalSearchText(event.target.value);
  };

  // Clear search text on component unmount
  useEffect(() => {
    return () => {
      setSearchText('');
    };
  }, []);

  return (
    <div
      className='flex flex-1 items-center justify-between text-black'
      ref={searchBarRef}
    >
      <div className='relative flex flex-1 items-center self-stretch'>
        <Search className='absolute left-5 -translate-x-1/2 text-secondary' />
        <div className='flex-1 self-stretch'>
          <Input
            placeholder={inPlaceholder}
            value={inValue ? inValue : localSearchText}
            onChange={onInChange ? onInChange : handleSearchTextChange}
            onFocus={onFocus}
            className='w-full bg-primary-300 px-2 text-center outline-none'
            data-testid={props['data-testid']}
          />
          {children}
        </div>
      </div>
    </div>
  );
};