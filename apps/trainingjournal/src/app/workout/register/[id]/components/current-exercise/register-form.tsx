'use client';

import { useTransition } from 'react';
import { createJournalEntryAction } from '../../../../action/journal-entry-actions';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '@/components/text-input/text-input';
import { useSelectedExercise } from '../register-context';
import { Box, Button } from '@tbergq/components';
import * as z from 'zod';
import WithFormLoadingState from '@/components/with-form-loading-state';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  workoutId: string;
};

const schema = z.object({
  reps: z.string().min(1, 'Reps is required'),
  weight: z.string().min(1, 'Weight is required'),
});

export default function RegisterForm({ workoutId }: Props) {
  const [, startTransition] = useTransition();
  const exercise = useSelectedExercise();
  const methods = useForm({
    defaultValues: {
      reps: '',
      weight: '',
    },
    mode: 'all',
    resolver: zodResolver(schema),
  });
  if (exercise == null) {
    return null;
  }
  const onCancel = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('exerciseId');
    window.history.pushState(null, '', `?${searchParams.toString()}`);
  };
  const handleSubmit = async (formData: FormData) => {
    const isValid = await methods.trigger();
    if (!isValid) {
      return;
    }
    startTransition(async () => {
      const response = await createJournalEntryAction(formData);
      methods.reset();
    });
  };

  return (
    <FormProvider {...methods}>
      <form action={handleSubmit}>
        <Box display="flex" direction="column" gap={4}>
          <input type="hidden" name="workoutId" value={workoutId} />
          <input name="exerciseId" value={exercise.exercise.id} type="hidden" />

          <Box display="flex" gap={4} flexGrow={1} flexWrap="wrap">
            <TextInput name="reps" label="Reps" />
            <TextInput name="weight" label="Weight" />
          </Box>
          <Box display="flex" gap={4}>
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
            <WithFormLoadingState>
              {pending => (
                <Button loading={pending} type="submit">
                  Register
                </Button>
              )}
            </WithFormLoadingState>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
