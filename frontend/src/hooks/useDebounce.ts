import { useCallback, useRef } from 'react';

/**
 * A custom hook that allows us to debounce a callback function.
 */
export const useDebounce = (callback: (input: any) => any, delay: number) => {
  const timeoutRef = useRef<any>();

  const debounceCallback = useCallback<(input: any) => any>(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debounceCallback;
};
