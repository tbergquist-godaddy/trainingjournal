import { Suspense } from 'react';
import ProtectedPage from '../auth/protected-page';
import Box from '../components/box/box';
import Button from '../components/button/button';
import Typography from '../components/typography/typography';
import ProgramList from './components/program-list';

export default function ProgramsPage() {
  return (
    <ProtectedPage>
      <Box display="flex" justifyContent="space-between">
        <Typography as="h1">Programs</Typography>
        <Button href="/programs/create">Add Program</Button>
      </Box>
      <Suspense fallback="Loading programs...">
        <ProgramList />
      </Suspense>
    </ProtectedPage>
  );
}
