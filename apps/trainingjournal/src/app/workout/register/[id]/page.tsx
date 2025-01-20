import ProtectedPage from '@/auth/protected-page';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import { getWorkoutById } from '@/workout/workout-service';
import ExerciseList from './components/exercise-list';
import { RegisterProvider } from './components/register-context';
import RegisterForm from './components/register-form';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RegisterWorkoutPage({ params }: Props) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (workout?.Day == null) {
    return <ProtectedPage>Freestyle not yet supported</ProtectedPage>;
  }
  return (
    <ProtectedPage>
      <RegisterProvider workout={workout}>
        <>
          <Typography as="h1">Register workout {workout.Day.name}</Typography>
          {workout.JournalEntry.length > 0 && (
            <Typography>Entries today: {workout.JournalEntry.length}</Typography>
          )}
          <Section>
            <ExerciseList />
          </Section>
          <Section>
            <RegisterForm workoutId={id} />
          </Section>
        </>
      </RegisterProvider>
    </ProtectedPage>
  );
}
