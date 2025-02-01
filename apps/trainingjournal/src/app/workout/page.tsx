import ProtectedPage from '@/auth/protected-page';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import { Box, Button } from '@tbergq/components';
import Link from 'next/link';
import { getWorkouts } from './workout-service';
import WorkoutList from './components/recent-workouts/workout-list';
import { Suspense } from 'react';

type Props = {
  searchParams: Promise<{ page?: string }>;
};
export default async function WorkoutPage({ searchParams }: Props) {
  const { page } = await searchParams;

  return (
    <ProtectedPage>
      <Typography size={1} as="h1">
        Workout
      </Typography>
      <Section>
        <Box display="inline-block">
          <Link href="/workout/register" passHref={true} legacyBehavior={true}>
            <Button href="/workout/register">Start new workout</Button>
          </Link>
        </Box>
      </Section>
      <Section>
        <Typography size={2} as="h2">
          Your recent workouts
        </Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <WorkoutList workoutPromise={getWorkouts({ page: parseInt(page ?? '1', 10) })} />
        </Suspense>
      </Section>
    </ProtectedPage>
  );
}
