import ProtectedPage from '@/auth/protected-page';
import Typography from '@/components/typography/typography';
import { getJournalEntryById } from '@/workout/journal-entry-service';
import JournalEntryForm from './components/journal-entry-form';
import { updateJournalEntryAction } from './actions/update-journal-entry';
import Section from '@/components/layout/section';

type Props = {
  params: { id: string };
};

export default async function EditJournalEntryPage({ params }: Props) {
  const { id } = params;
  const journalEntry = await getJournalEntryById(id);

  return (
    <ProtectedPage>
      {journalEntry == null ? (
        <div>Journal entry not found</div>
      ) : (
        <>
          <Typography as="h1">Edit Journal Entry</Typography>
          <Section>
            <JournalEntryForm
              defaultValues={{
                id: journalEntry.id,
                reps: journalEntry.reps,
                weight: journalEntry.weight,
                workoutId: journalEntry.workoutId,
                exercise: journalEntry.exercise,
              }}
              action={updateJournalEntryAction}
            />
          </Section>
        </>
      )}
    </ProtectedPage>
  );
}
