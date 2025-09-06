'use client';
import List from '@/components/list/list';
import Typography from '@/components/typography/typography';
import { GetJournalEntriesForExercise } from '@/services/exercises/exercise-service';
import { Box, Button, FormattedDate } from '@tbergq/components';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import JournalEntriesTitle from './journal-entries-title';

type Props = {
  journalEntriesPromise: GetJournalEntriesForExercise;
  exerciseId: string;
};

export default function JournalEntriesList({ journalEntriesPromise, exerciseId }: Props) {
  const { journalEntries, hasNextPage, hasPreviousPage } = use(journalEntriesPromise);
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const makePaginationHandler = (operation: '+' | '-') => {
    const operators = {
      '+': (a: number, b: number) => a + b,
      '-': (a: number, b: number) => a - b,
    };
    return () => {
      const page = query.get('page') ?? 1;
      const nextPage = operators[operation](+page, 1);
      router.push(`${pathname}?page=${nextPage}`);
    };
  };

  const noJournalEntiresExists = journalEntries.length === 0;

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <JournalEntriesTitle />
        {noJournalEntiresExists ? (
          <Typography type="subtle">No journal entries found for this exercise yet.</Typography>
        ) : (
          <Link href={`/exercises/graph/${exerciseId}`}>
            <Button href={`/exercises/graph/${exerciseId}`} buttonSize="small">
              Graph
            </Button>
          </Link>
        )}
      </Box>
      {noJournalEntiresExists ? (
        <Typography type="subtle">No journal entries found for this exercise yet.</Typography>
      ) : (
        <Box direction="column" gap={4} display="flex">
          <List>
            {journalEntries.map(entry => (
              <List.Item key={entry.id}>
                <Link href={`/journal-entry/${entry.id}/edit`}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <div>
                      <Box display="flex" gap={2} alignItems="center">
                        <strong>
                          {entry.reps} × {entry.weight}
                        </strong>
                        {entry.workout.Day && (
                          <Typography type="subtle">
                            {entry.workout.Day.Week.Program.name} - {entry.workout.Day.Week.name}:{' '}
                            {entry.workout.Day.name}
                          </Typography>
                        )}
                      </Box>
                    </div>
                    <FormattedDate date={entry.workout.date} />
                  </Box>
                </Link>
              </List.Item>
            ))}
          </List>
          {hasNextPage || hasPreviousPage ? (
            <Box display="flex" gap={2}>
              <Button
                onClick={makePaginationHandler('-')}
                disabled={!hasPreviousPage}
                variant="secondary"
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </Button>
              <Button
                onClick={makePaginationHandler('+')}
                disabled={!hasNextPage}
                variant="secondary"
                aria-label="Next page"
              >
                <FaChevronRight />
              </Button>
            </Box>
          ) : null}
        </Box>
      )}
    </div>
  );
}
