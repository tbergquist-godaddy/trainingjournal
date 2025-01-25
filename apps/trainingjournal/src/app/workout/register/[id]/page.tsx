import ProtectedPage from '@/auth/protected-page';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import { getWorkoutById } from '@/workout/workout-service';
import ExerciseList from './components/exercise-list';
import { RegisterProvider } from './components/register-context';
import CurrentExercise from './components/current-exercise/current-exercise';
import { getLatestJournalEntries } from '@/workout/journal-entry-service';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ exerciseId?: string }>;
};

export default async function RegisterWorkoutPage({ params, searchParams }: Props) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const workout = await getWorkoutById(id);

  const exerciseId = workout?.Day?.PlannedExercise?.find(
    exercise => exercise.id === sp.exerciseId,
  )?.exerciseId;
  const latestRegister = exerciseId == null ? null : getLatestJournalEntries(exerciseId);
  if (workout?.Day == null) {
    return <ProtectedPage>Freestyle not yet supported</ProtectedPage>;
  }
  return (
    <ProtectedPage>
      <RegisterProvider workout={workout}>
        <>
          <Typography as="h1">Register workout {workout.Day.name}</Typography>
          <Section>
            <ExerciseList />
          </Section>
          <Section>
            <CurrentExercise latestRegister={latestRegister} workoutId={id} />
          </Section>
        </>
      </RegisterProvider>
    </ProtectedPage>
  );
}
