'use client';

import Typography from '@/components/typography/typography';
import RegisterForm from './register-form';
import { useSelectedExercise, useRegisterContext } from '../register-context';
import { Box } from '@tbergq/components';
import type { GetLatestJournalEntries } from '@/workout/journal-entry-service';
import { use } from 'react';

type Props = {
  workoutId: string;
  latestRegister: GetLatestJournalEntries | null;
};

export default function CurrentExercise({ workoutId, latestRegister }: Props) {
  const exercise = useSelectedExercise();
  const { workout } = useRegisterContext();
  const journalEntries = latestRegister != null ? use(latestRegister) : null;
  const registeredToday = workout?.JournalEntry?.length ?? 0;

  return (
    <Box display="flex" direction="column" gap={4}>
      <Typography as="h2">{exercise?.exercise.name}</Typography>
      {journalEntries != null && (
        <span>
          <Typography as="span">
            Latest register:{' '}
            {journalEntries.map(entry => [`${entry.reps}x${entry.weight}`]).join(', ')}
          </Typography>
        </span>
      )}
      {registeredToday > 0 && (
        <span>
          Registered today:{' '}
          {workout?.JournalEntry.map(entry => [`${entry.reps}x${entry.weight}`]).join(', ')}
        </span>
      )}
      <RegisterForm workoutId={workoutId} />
    </Box>
  );
}
