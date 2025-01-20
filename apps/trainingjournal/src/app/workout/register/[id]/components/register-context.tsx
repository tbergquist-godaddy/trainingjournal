'use client';

import { createContext, ReactNode, use } from 'react';
import type { Workout } from '../../../workout-service';

type Props = {
  workout: Awaited<Workout>;
  children: ReactNode;
};
type State =
  | {
      workout: Props['workout'];
    }
  | undefined;

export const RegisterContext = createContext<State>(undefined);

export function RegisterProvider({ workout, children }: Props) {
  return <RegisterContext.Provider value={{ workout }}>{children}</RegisterContext.Provider>;
}

export function useRegisterContext() {
  const context = use(RegisterContext);
  if (context == null) {
    throw new Error('RegisterContext not found');
  }
  return context;
}
