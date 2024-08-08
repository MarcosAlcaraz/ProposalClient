import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PathItem {
  id: number;
  title: string;
}

interface PathStack {
  path: PathItem[];
}

interface GlobalContextType {
  fatherID: number;
  setFatherID: (value: number) => void;
  oldFatherID: number;
  setOldFatherID: (value:number) => void;
  pathStackOfProposalView: PathStack;
  setPathStackOfProposalView: (value: PathStack) => void;
  pathText: string;
  setPathText: (value: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [fatherID, setFatherID] = useState<number>(0);
  const [oldFatherID, setOldFatherID] = useState<number>(0);
  const [pathText, setPathText] = useState<string>("");
  const [pathStackOfProposalView, setPathStackOfProposalView] = useState<PathStack>({ path: [] });

  return (
    <GlobalContext.Provider value={{ fatherID, setFatherID, pathText, setPathText,pathStackOfProposalView, setPathStackOfProposalView, oldFatherID, setOldFatherID }}>
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
