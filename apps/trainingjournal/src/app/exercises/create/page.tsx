import ProtectedPage from '../../auth/protected-page';
import Typography from '../../components/typography/typography';
import CreateExercise from './components/create-exercise';

export default function CreateExercisePage() {
  return (
    <ProtectedPage>
      <Typography as="h1">Create Exercise</Typography>
      <CreateExercise />
    </ProtectedPage>
  );
}
