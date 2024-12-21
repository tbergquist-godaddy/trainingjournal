import ProtectedPage from '@/auth/protected-page';
import Box from '@/components/box/box';
import { Button } from '@tbergq/components';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import { getDayById } from '@/programs/week/days/day-service';
import Link from 'next/link';
import { Suspense } from 'react';
import PlannedExerciseList from './components/planned-exercise-list';
import PlannedExerciseForm, { PlannedExerciseLoader } from './components/planned-exercise-form';
import { getExercises } from '@/services/exercises/exercise-service';

type Props = {
  params: Promise<{ id: string; dayId: string }>;
};
export default async function EditDay({ params }: Props) {
  const { dayId, id } = await params;
  const day = await getDayById(dayId);
  const exercisesPromise = getExercises();
  return (
    <ProtectedPage>
      <Typography as="h1">Edit {day?.name}</Typography>
      <Section>
        <Box display="flex" direction="column" gap={4}>
          <Typography as="h2">Add exercise</Typography>
          <Suspense fallback={<PlannedExerciseLoader />}>
            <PlannedExerciseForm dayId={dayId} exercisesPromise={exercisesPromise} />
          </Suspense>
          <Typography as="h2">Exercises</Typography>
          <Suspense fallback={'Loading...'}>
            <PlannedExerciseList dayId={dayId} />
          </Suspense>
        </Box>
      </Section>
      <Section>
        <Box display="flex">
          <Link href={`/programs/edit/${id}`} legacyBehavior={true}>
            <Button variant="secondary" href={`/programs/edit/${id}`}>
              Back
            </Button>
          </Link>
        </Box>
      </Section>
    </ProtectedPage>
  );
}
