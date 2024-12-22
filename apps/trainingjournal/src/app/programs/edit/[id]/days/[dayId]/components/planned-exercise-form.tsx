'use client';

import { use, useActionState, useTransition } from 'react';
import type { Exercises } from '@/services/exercises/exercise-service';
import { Select } from '@tbergq/rhf-adapter';
import { FaPlus } from 'react-icons/fa';
import { Box, Button } from '@tbergq/components';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/text-input/text-input';
import Section from '@/components/layout/section';
import { createPlannedExercise } from '../actions/planned-exercise-actions';
import styles from './planned-exercise.module.css';

type Props = {
  exercisesPromise: Exercises;
  dayId: string;
};

const defaultValues = {
  exerciseId: '',
  sets: '',
  reps: '',
  description: '',
};

const plannedExerciseSchema = z.object({
  exerciseId: z.string().min(1, 'Exercise is required'),
  sets: z.string().min(1, 'Sets must be at least 1'),
  reps: z.string().min(1, 'Reps must be at least 1'),
  description: z.string(),
  dayId: z.string().min(1, 'Day is required'),
});

export const PlannedExerciseLoader = () => <div className={styles.loader} />;

export default function PlannedExerciseForm({ exercisesPromise, dayId }: Props) {
  const [state, action] = useActionState(createPlannedExercise, null);
  const exercises = use(exercisesPromise);
  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      dayId,
    },
    resolver: zodResolver(plannedExerciseSchema),
    mode: 'all',
  });
  const [isPending, startTransaction] = useTransition();
  return (
    <FormProvider {...methods}>
      <form
        action={async values => {
          const valid = await methods.trigger();

          if (!valid) {
            return;
          }
          startTransaction(async () => {
            await action(values);
            methods.reset();
          });
        }}
      >
        <input type="hidden" name="dayId" value={dayId} />
        <Box flexWrap="wrap" display="flex" direction="row" gap={2}>
          <Box flexGrow={1} flexShrink={1} flexBasis="300px">
            <Select
              name="exerciseId"
              label="Exercise"
              options={exercises.map(exercise => ({ value: exercise.id, text: exercise.name }))}
            />
          </Box>
          <Box display="flex" flexGrow={1} flexShrink={1} flexBasis="100px">
            <TextInput name="sets" label="Sets" />
          </Box>
          <Box display="flex" flexGrow={1} flexShrink={1} flexBasis="100px">
            <TextInput name="reps" label="Reps" />
          </Box>
          <Box flexGrow={1} flexShrink={1} flexBasis="300px">
            <TextInput name="description" label="Description (optional)" />
          </Box>
        </Box>
        <Section>
          <Button loading={isPending} type="submit">
            <Box display="flex" alignItems="center" gap={2}>
              <FaPlus />
              Add exercise
            </Box>
          </Button>
        </Section>
      </form>
    </FormProvider>
  );
}
