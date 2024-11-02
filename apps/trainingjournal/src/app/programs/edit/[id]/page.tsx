import { Suspense } from 'react';
import ProtectedPage from '../../../auth/protected-page';
import Box from '../../../components/box/box';
import Typography from '../../../components/typography/typography';
import EditProgram from './components/edit-program';
import DeleteProgramForm from './components/delete-program-form';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProgramsPage({ params }: Props) {
  const { id } = await params;
  return (
    <ProtectedPage>
      <Box display="flex" justifyContent="space-between">
        <Typography as="h1">Edit Program</Typography>
        <DeleteProgramForm id={id} />
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProgram id={id} />
      </Suspense>
    </ProtectedPage>
  );
}
