import { Suspense } from 'react';
import ProtectedPage from '@/auth/protected-page';
import { Container, Spinner, Box } from '@tbergq/components';
import { getJournalEntriesForGraph } from '@/services/exercises/exercise-service';
import ExerciseGraphClient from './components/exercise-graph-client';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ startDate?: string; endDate?: string }>;
};

export default async function ExerciseGraphPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { startDate, endDate } = await searchParams;

  // Parse dates if provided, fallback to undefined if invalid
  const parsedStartDate = startDate
    ? (() => {
        const date = new Date(startDate);
        return isNaN(date.getTime()) ? undefined : date;
      })()
    : undefined;

  const parsedEndDate = endDate
    ? (() => {
        const date = new Date(endDate);
        return isNaN(date.getTime()) ? undefined : date;
      })()
    : undefined;

  return (
    <ProtectedPage>
      <Container>
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
              <Spinner />
            </Box>
          }
        >
          <ExerciseGraphClient
            exerciseId={id}
            initialDataPromise={getJournalEntriesForGraph(id, {
              startDate: parsedStartDate,
              endDate: parsedEndDate,
            })}
          />
        </Suspense>
      </Container>
    </ProtectedPage>
  );
}
