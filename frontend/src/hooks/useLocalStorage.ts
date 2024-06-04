import { useState, useEffect } from 'react';

/**
 * A custom hook that allows us to use local storage in React.
 */
export function useLocalStorage(key: string, initialValue: any = null) {
  const [value, setValue] = useState(() => {
    try {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, setValue]);

  return [value, setValue];
}
