import { useState,useCallback } from "react";

export function useLocalStorage(key, init) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : init;
    } catch {
      return init;
    }
  });
 
  // useCallback: memoize setValue so it doesn't recreate on every render.
  // Without this, any component receiving setValue as a prop would
  // re-render unnecessarily every time the parent renders.
  const setValue = useCallback(
    (value) => {
      try {
        // Support functional updates: setValue(prev => prev + 1)
        const next = value instanceof Function ? value(storedValue) : value;
        setStoredValue(next);
        localStorage.setItem(key, JSON.stringify(next));
      } catch (err) {
        console.error("[useLocalStorage] write error:", err);
      }
    },
    [key, storedValue]
  );
 
  return [storedValue, setValue];
}