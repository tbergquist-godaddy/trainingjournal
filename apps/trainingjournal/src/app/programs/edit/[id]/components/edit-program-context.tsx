'use client';

import { createContext, ReactNode, use } from 'react';

type EditProgramContextType = {
  programId: string;
};

type Props = EditProgramContextType & {
  children: ReactNode;
};

const EditProgramContext = createContext<EditProgramContextType | undefined>(undefined);

export const EditProgramProvider = ({ programId, children }: Props) => {
  return (
    <EditProgramContext.Provider value={{ programId }}>{children}</EditProgramContext.Provider>
  );
};

export const useEditProgram = () => {
  const context = use(EditProgramContext);
  if (context === undefined) {
    throw new Error('useEditProgram must be used within a EditProgramProvider');
  }
  return context;
};
