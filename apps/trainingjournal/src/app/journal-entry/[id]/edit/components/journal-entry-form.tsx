'use client';

import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '@/components/text-input/text-input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Section from '@/components/layout/section';
import { Button, Box } from '@tbergq/components';
import { use, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Select } from '@tbergq/rhf-adapter';
import type { Exercises } from '@/services/exercises/exercise-service';

const journalEntrySchema = z.object({
  reps: z.string().min(1, 'Reps is required'),
  weight: z.string().min(1, 'Weight is required'),
  id: z.string().min(1, 'ID is required'),
  exerciseId: z.string().min(1, 'Exercise is required'),
});

type JournalEntryFormData = {
  id: string;
  reps: string;
  weight: string;
  workoutId: string;
  exerciseId: string;
};

type Props = {
  defaultValues: JournalEntryFormData;
  exercisesPromise: Exercises;
  action: (data: FormData) => Promise<unknown>;
  actionText?: string;
};

export default function JournalEntryForm({
  defaultValues,
  exercisesPromise,
  action,
  actionText = 'Update Entry',
}: Props) {
  const router = useRouter();
  const exercises = use(exercisesPromise);
  const methods = useForm({
    defaultValues: {
      reps: defaultValues.reps,
      weight: defaultValues.weight,
      id: defaultValues.id,
      exerciseId: defaultValues.exerciseId,
    },
    resolver: zodResolver(journalEntrySchema),
    mode: 'all',
  });
  const [pending, startTransition] = useTransition();

  return (
    <FormProvider {...methods}>
      <form
        action={async (formData: FormData) => {
          // Ensure form validation runs before submission
          const isValid = await methods.trigger();
          if (!isValid) {
            // If invalid, prevent the form from submitting
            return;
          }

          startTransition(async () => {
            await action(formData);
            // Redirect to workout details page
            router.push(`/workout/${defaultValues.workoutId}`);
          });
        }}
      >
        <Section>
          <Box display="flex" direction="column" gap={4}>
            <Select
              name="exerciseId"
              label="Exercise"
              options={exercises.map(exercise => ({ value: exercise.id, text: exercise.name }))}
            />
            <TextInput label="Reps" name="reps" />
            <TextInput label="Weight" name="weight" />
            <input type="hidden" {...methods.register('id')} />
          </Box>
        </Section>
        <Section>
          <Box display="flex" gap={4}>
            <Button loading={pending} type="submit">
              {actionText}
            </Button>
            <Link href={`/workout/${defaultValues.workoutId}`} legacyBehavior={true}>
              <Button variant="secondary" href={`/workout/${defaultValues.workoutId}`}>
                Cancel
              </Button>
            </Link>
          </Box>
        </Section>
      </form>
    </FormProvider>
  );
}
