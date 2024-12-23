import { useState, useEffect } from 'react';
import type { ProjectData } from '../types';

const DEFAULT_PROJECT: ProjectData = {
  version: '1.0.0',
  projectName: '',
  projectBudget: 0,
  targetProfit: 20, // default 20%
  incomeTaxRate: 10, // default 10%
  costs: {
    preQuotation: {},
    preEvent: {},
    eventDay: {},
    postEvent: {},
    general: {}
  },
  workers: [],
  lastUpdated: new Date().toISOString()
};

export function useLocalStorage(key: string, initialValue: ProjectData = DEFAULT_PROJECT) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<ProjectData>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: ProjectData | ((val: ProjectData) => ProjectData)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update last modified timestamp
      valueToStore.lastUpdated = new Date().toISOString();
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
