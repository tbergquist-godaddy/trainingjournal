import ProtectedPage from '@/auth/protected-page';
import Section from '@/components/layout/section';
import Typography from '@/components/typography/typography';
import WorkoutForm from './components/workout-form';

export default function WorkoutRegisterPage() {
  return (
    <ProtectedPage>
      <Typography as="h1">Register workout</Typography>
      <Section>
        <WorkoutForm />
      </Section>
    </ProtectedPage>
  );
}
