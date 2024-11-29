'use client';

import Box from '@/components/box/box';
import Button from '@/components/button/button';
import List from '@/components/list/list';
import { FaTrash } from 'react-icons/fa';
import { deletePlannedExercise } from '../actions/planned-exercise-actions';
import type { PlannedExercise } from '@/services/planned-exercise-service';
import { useTransition } from 'react';

export default function PlannedExerciseItem({
  plannedExercise,
}: {
  plannedExercise: Awaited<PlannedExercise>[0];
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <List.Item key={plannedExercise.id}>
      <Box display="flex" direction="row" justifyContent="space-between">
        <span>
          {plannedExercise.exercise.name} - {plannedExercise.sets} x {plannedExercise.reps}
        </span>
        <form
          action={(formData: FormData) => {
            startTransition(async () => {
              await deletePlannedExercise(formData);
            });
          }}
        >
          <input type="hidden" name="plannedExerciseId" value={plannedExercise.id} />
          <Button
            buttonSize="small"
            variant="danger"
            aria-label={`Delete ${plannedExercise.exercise.name}`}
            type="submit"
            loading={isPending}
          >
            <FaTrash size={12} />
          </Button>
        </form>
      </Box>
    </List.Item>
  );
}
