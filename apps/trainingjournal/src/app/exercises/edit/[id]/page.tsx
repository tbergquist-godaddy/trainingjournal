import { Suspense } from 'react';
import Section from '../../../components/layout/section';
import Typography from '../../../components/typography/typography';
import EditExercise from './components/edit-exercise';
import { Button, Box } from '@tbergq/components';
import deleteExercise from './actions/delete-exercise-action';
import { getJournalEntriesForExercise } from '../../../services/exercises/exercise-service';
import JournalEntriesList from './components/journal-entries-list';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function EditExercisePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;
  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography as="h1">Edit exercise</Typography>
      </Box>
      <Section>
        <Suspense fallback="loading">
          <EditExercise
            extraActions={
              <form action={deleteExercise}>
                <input type="hidden" name="id" value={id} />
                <Button variant="danger" type="submit">
                  Delete
                </Button>
              </form>
            }
            id={id}
          />
        </Suspense>
      </Section>
      <Section>
        <Typography size={2} as="h2">
          Journal Entries
        </Typography>
        <Suspense fallback={<div>Loading journal entries...</div>}>
          <JournalEntriesList
            journalEntriesPromise={getJournalEntriesForExercise(id, {
              page: parseInt(page ?? '1', 10),
            })}
          />
        </Suspense>
      </Section>
    </div>
  );
}
