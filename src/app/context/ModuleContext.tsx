// I have created this Context API to create global variables of module so that it can be used throughout the application in each step

'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModulesContextProps {
  selectedModules: string[];
  setSelectedModules: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModulesContext = createContext<ModulesContextProps | undefined>(
  undefined
);

export const ModulesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  return (
    <ModulesContext.Provider value={{ selectedModules, setSelectedModules }}>
      {children}
    </ModulesContext.Provider>
  );
};

export const useModules = (): ModulesContextProps => {
  const context = useContext(ModulesContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModulesProvider');
  }
  return context;
};
