import ProtectedPage from '@/auth/protected-page';
import Typography from '@/components/typography/typography';
import { getJournalEntryById } from '@/workout/journal-entry-service';
import JournalEntryForm from './components/journal-entry-form';
import { updateJournalEntryAction } from './actions/update-journal-entry';
import Section from '@/components/layout/section';
import { getExercises } from '@/services/exercises/exercise-service';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditJournalEntryPage({ params }: Props) {
  const { id } = await params;
  const journalEntry = await getJournalEntryById(id);
  const exercisesPromise = getExercises();

  return (
    <ProtectedPage>
      {journalEntry == null ? (
        <div>Journal entry not found</div>
      ) : (
        <>
          <Typography as="h1">Edit Journal Entry</Typography>
          <Section>
            <Suspense fallback={<div style={{ height: "308px" }}>Loading...</div>}>
              <JournalEntryForm
                defaultValues={{
                  id: journalEntry.id,
                  reps: journalEntry.reps,
                  weight: journalEntry.weight,
                  workoutId: journalEntry.workoutId,
                  exerciseId: journalEntry.exercise.id,
                }}
                exercisesPromise={exercisesPromise}
                action={updateJournalEntryAction}
              />
            </Suspense>
          </Section>
        </>
      )}
    </ProtectedPage>
  );
}
