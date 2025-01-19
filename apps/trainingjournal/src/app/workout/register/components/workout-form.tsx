'use client';

import { useActionState } from 'react';
import { createWorkoutAction } from '../../action/workout-actions';
import TextInput from '@/components/text-input/text-input';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button } from '@tbergq/components';

export default function WorkoutForm() {
  const [, formAction] = useActionState(createWorkoutAction, null);
  const methods = useForm({
    defaultValues: {
      dayId: 'Freestyle',
    },
    mode: 'all',
  });
  return (
    <FormProvider {...methods}>
      <form action={formAction}>
        <Box display="flex" direction="column" gap={4}>
          <Box display="flex" gap={1} alignItems="end">
            <TextInput label="Day" name="dayId" readOnly={true} />
            <Button variant="tertiary">Select day</Button>
          </Box>
          <Button type="submit">Create workout</Button>
        </Box>
      </form>
    </FormProvider>
  );
}
