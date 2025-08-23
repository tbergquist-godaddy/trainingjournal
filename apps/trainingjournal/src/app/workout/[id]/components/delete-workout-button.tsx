'use client';

import { Button } from '@tbergq/components';
import { deleteWorkoutAction } from '../../action/workout-actions';
import { useActionState } from 'react';

type Props = {
  workoutId: string;
};

export default function DeleteWorkoutButton({ workoutId }: Props) {
  const [state, formAction, isPending] = useActionState(deleteWorkoutAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="workoutId" value={workoutId} />
      <Button 
        type="submit" 
        variant="danger" 
        loading={isPending}
        disabled={isPending}
      >
        Delete Workout
      </Button>
    </form>
  );
}
