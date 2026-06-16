'use client';

import { useEffect, useRef } from 'react';

interface UseOutsideClickProps {
  callback: () => void;
}

export default function useOutsideClick<T extends HTMLElement>({ callback }: UseOutsideClickProps) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}
