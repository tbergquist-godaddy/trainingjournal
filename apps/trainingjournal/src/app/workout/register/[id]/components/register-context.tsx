'use client';

import { createContext, ReactNode, use } from 'react';
import type { Workout } from '../../../workout-service';
import { useSearchParams } from 'next/navigation';

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

export function useSelectedExercise() {
  const params = useSearchParams();
  const exerciseId = params.get('exerciseId');
  const { workout } = useRegisterContext();
  return workout?.Day?.PlannedExercise?.find(exercise => exercise.id === exerciseId);
}
