import { Suspense } from 'react';
import ProtectedPage from '../../../auth/protected-page';
import Box from '../../../components/box/box';
import Typography from '../../../components/typography/typography';
import EditProgram from './components/edit-program';
import DeleteProgramForm from './components/delete-program-form';
import AddWeek from './components/add-week';
import { getWeeks } from '@/programs/week/week-service';
import WeekList from '@/programs/week/components/week-list';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProgramsPage({ params }: Props) {
  const { id } = await params;
  const weeks = getWeeks(id);
  return (
    <ProtectedPage>
      <Box display="flex" justifyContent="space-between">
        <Typography as="h1">Edit Program</Typography>
        <DeleteProgramForm id={id} />
      </Box>
      <Suspense fallback={<div style={{ height: 220 }}>Loading...</div>}>
        <EditProgram id={id}>
          <AddWeek programId={id} weeks={weeks} />
        </EditProgram>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <WeekList weeks={weeks} />
      </Suspense>
    </ProtectedPage>
  );
}
