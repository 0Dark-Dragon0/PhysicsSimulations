import { useState, useEffect } from 'react';

/**
 * A custom hook that syncs a piece of state with the URL hash.
 * This allows for "Shareable Simulations" by copying the URL.
 * 
 * @param {string} key - The unique key in the URL (e.g. 'lab1_state')
 * @param {any} initialState - The default state if none is in the URL
 * @returns [state, setState]
 */
export function useUrlState(key, initialState) {
  // Read initial state from URL on mount
  const getInitialState = () => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return initialState;
      
      const params = new URLSearchParams(hash);
      const encodedState = params.get(key);
      
      if (encodedState) {
        // Decode base64 to JSON
        const decoded = atob(encodedState);
        return JSON.parse(decoded);
      }
    } catch (e) {
      console.warn('Failed to parse URL state', e);
    }
    return initialState;
  };

  const [state, setState] = useState(getInitialState);

  // Sync state back to URL whenever it changes
  useEffect(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      const params = new URLSearchParams(hash);
      
      // Serialize state to base64 to keep URL clean and handle complex objects
      const serialized = btoa(JSON.stringify(state));
      params.set(key, serialized);
      
      // Update URL without reloading page
      window.history.replaceState(null, '', `#${params.toString()}`);
    } catch (e) {
      console.warn('Failed to stringify state for URL', e);
    }
  }, [key, state]);

  return [state, setState];
}
