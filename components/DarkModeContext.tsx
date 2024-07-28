import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DarkModeContextProps {
  isDarkModeEnabled: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

export const useDarkMode = (): DarkModeContextProps => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  useEffect(() => {
    const loadDarkModePreference = async () => {
      const storedPreference = await AsyncStorage.getItem('darkMode');
      if (storedPreference !== null) {
        setIsDarkModeEnabled(JSON.parse(storedPreference));
      }
    };
    loadDarkModePreference();
  }, []);

  const toggleDarkMode = async () => {
    setIsDarkModeEnabled(prev => {
      const newValue = !prev;
      AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
      return newValue;
    });
  };

  const setDarkMode = async (value: boolean) => {
    setIsDarkModeEnabled(value);
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
  };

  return (
    <DarkModeContext.Provider value={{ isDarkModeEnabled, toggleDarkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
