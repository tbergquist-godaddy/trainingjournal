import { Suspense } from 'react';
import Link from 'next/link';
import ProtectedPage from '../auth/protected-page';
import Typography from '../components/typography/typography';

import ExerciseList from './components/exercise-list';
import Button from '../components/button/button';
import Box from '../components/box/box';

export default function ExercisePage() {
  return (
    <ProtectedPage>
      <Box display="flex" justifyContent="space-between">
        <Typography as="h1">Exercises</Typography>
        <Link legacyBehavior href={'/exercises/create'}>
          <Button href="/exercises/create">Add</Button>
        </Link>
      </Box>
      <Suspense fallback={'loading'}>
        <ExerciseList />
      </Suspense>
    </ProtectedPage>
  );
}
