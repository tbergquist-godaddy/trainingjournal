'use client';

import { Button } from '@tbergq/components';
import { FaTrash } from 'react-icons/fa';
import { deletePlannedExercise } from '../actions/planned-exercise-actions';
import { useTransition } from 'react';

type Props = {
  name: string;
  id: string;
};

export default function DeletePlannedExerciseItem({ name, id }: Props) {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      action={(formData: FormData) => {
        startTransition(async () => {
          await deletePlannedExercise(formData);
        });
      }}
    >
      <input type="hidden" name="plannedExerciseId" value={id} />
      <Button
        buttonSize="small"
        variant="danger"
        aria-label={`Delete ${name}`}
        type="submit"
        loading={isPending}
      >
        <FaTrash size={12} />
      </Button>
    </form>
  );
}
