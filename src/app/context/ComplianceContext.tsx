// I have created this Context API to create global variables of module so that it can be used throughout the application in each step
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ComplianceContextProps {
  selectedModules: string | null;
  selectedRules: string[];
  prompts: Prompt[];
  geminiResponse: any;
  pdfFile: File | null;
  setSelectedModules: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedRules: React.Dispatch<React.SetStateAction<string[]>>;
  setPrompts: React.Dispatch<React.SetStateAction<Prompt[]>>;
  setGeminiResponse: React.Dispatch<React.SetStateAction<any>>;
  setPdfFile: React.Dispatch<React.SetStateAction<File | null>>;
}

interface Prompt {
  reference: string;
  comment: string;
  rule_implementation: boolean;
  reason: string;
}

const ComplianceContext = createContext<ComplianceContextProps | undefined>(
  undefined
);

export const ComplianceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedModules, setSelectedModules] = useState<string | null>(null);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [geminiResponse, setGeminiResponse] = useState<any>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  return (
    <ComplianceContext.Provider
      value={{
        selectedModules,
        selectedRules,
        prompts,
        geminiResponse,
        pdfFile,
        setSelectedModules,
        setSelectedRules,
        setPrompts,
        setGeminiResponse,
        setPdfFile,
      }}
    >
      {children}
    </ComplianceContext.Provider>
  );
};

export const useCompliance = (): ComplianceContextProps => {
  const context = useContext(ComplianceContext);
  if (context === undefined) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }
  return context;
};
