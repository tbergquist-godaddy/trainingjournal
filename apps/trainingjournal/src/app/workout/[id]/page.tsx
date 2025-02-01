import ProtectedPage from '@/auth/protected-page';
import Typography from '@/components/typography/typography';
import { getWorkoutById } from '../workout-service';
import Section from '@/components/layout/section';
import List from '@/components/list/list';
import { Box, Button } from '@tbergq/components';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WorkoutPage({ params }: Props) {
  const { id } = await params;
  const workout = await getWorkoutById(id, { includeEntryExercise: true });
  return (
    <ProtectedPage>
      <Section>
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={3}
          alignItems="center"
        >
          <Typography size={1} as="h1">
            Workout&nbsp;
            {workout != null && new Intl.DateTimeFormat('en-US').format(new Date(workout.date))}
          </Typography>
          <Box display="flex" gap={2}>
            <Link href="/workout" passHref={true} legacyBehavior={true}>
              <Button href="/workout" variant="secondary">
                Back
              </Button>
            </Link>
            <Link href={`/workout/register/${id}`} passHref={true} legacyBehavior={true}>
              <Button href={`/workout/register/${id}`} variant="tertiary">
                Continue register
              </Button>
            </Link>
          </Box>
        </Box>
      </Section>
      <List>
        {workout?.JournalEntry.map(entry => (
          <List.Item key={entry.id}>
            {entry.exercise.name}: {entry.reps}&nbsp;x&nbsp;{entry.weight}
          </List.Item>
        ))}
      </List>
    </ProtectedPage>
  );
}
