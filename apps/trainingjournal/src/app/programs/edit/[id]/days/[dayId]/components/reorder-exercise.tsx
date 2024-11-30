'use client';

import Box from '@/components/box/box';
import Button from '@/components/button/button';
import { reorderPlannedExercise } from '../actions/planned-exercise-actions';
import { useTransition } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

type Props = {
  id: string;
  isFirst: boolean;
  isLast: boolean;
};
export default function ReorderExercise({ id, isFirst, isLast }: Props) {
  const [isPending, startTransition] = useTransition();
  const formAction = (formData: FormData) => {
    startTransition(() => {
      reorderPlannedExercise(formData);
    });
  };
  return (
    <Box display="flex" gap={2}>
      <form action={formAction}>
        <input type="hidden" name="plannedExerciseId" value={id} />
        <input type="hidden" name="direction" value="UP" />
        <Button
          loading={isPending}
          variant="secondary"
          buttonSize="small"
          aria-label="Move up"
          type="submit"
          disabled={isFirst}
        >
          <FaArrowUp size={12} />
        </Button>
      </form>
      <form action={formAction}>
        <input type="hidden" name="plannedExerciseId" value={id} />
        <input type="hidden" name="direction" value="DOWN" />
        <Button
          loading={isPending}
          buttonSize="small"
          variant="secondary"
          aria-label="Move down"
          type="submit"
          disabled={isLast}
        >
          <FaArrowDown size={12} />
        </Button>
      </form>
    </Box>
  );
}
