import { Suspense } from 'react';
import ProtectedPage from '../auth/protected-page';
import Typography from '../components/typography/typography';

import ExerciseList from './components/exercise-list';

export default function ExercisePage() {
  return (
    <ProtectedPage>
      <Typography as="h1">Exercises</Typography>
      <Suspense fallback={'loading'}>
        <ExerciseList />
      </Suspense>
    </ProtectedPage>
  );
}
