import ProtectedPage from '@/auth/protected-page';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import { getWorkoutById } from '@/workout/workout-service';
import ExerciseList from './components/exercise-list';
import { RegisterProvider } from './components/register-context';

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
          <Section>
            <ExerciseList />
          </Section>
          <Section>TODO: Register form</Section>
        </>
      </RegisterProvider>
    </ProtectedPage>
  );
}
