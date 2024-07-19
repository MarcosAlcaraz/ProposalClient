// src/context/GlobalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  fatherID: string;
  setFatherID: (value: string) => void;
  path: string[];
  setPath: (value: string[]) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [fatherID, setFatherID] = useState<string>('');
  const [path, setPath] = useState<string[]>(['']);

  return (
    <GlobalContext.Provider value={{ fatherID, setFatherID, path, setPath }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
