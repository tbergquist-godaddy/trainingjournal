'use client';
import List from '@/components/list/list';
import Typography from '@/components/typography/typography';
import { GetWorkouts } from '@/workout/workout-service';
import { Box, Button } from '@tbergq/components';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Props = {
  workoutPromise: GetWorkouts;
};

export default function WorkoutList({ workoutPromise }: Props) {
  const { workouts, hasNextPage, hasPreviousPage } = use(workoutPromise);
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

  return (
    <Box direction="column" gap={4} display="flex">
      <List>
        {workouts.map(workout => (
          <List.Item key={workout.id}>
            <Box display="flex" gap={2}>
              <div>
                <strong>{workout.Day?.Week.Program.name}</strong>
                <Typography type="subtle">{workout.Day?.name}</Typography>
              </div>
              {new Intl.DateTimeFormat('en-US').format(new Date(workout.date))}
            </Box>
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
  );
}
