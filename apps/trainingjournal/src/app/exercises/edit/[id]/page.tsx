import { Suspense } from 'react';
import Section from '../../../components/layout/section';
import Typography from '../../../components/typography/typography';
import EditExercise from './components/edit-exercise';
import { Button, Box } from '@tbergq/components';
import deleteExercise from './actions/delete-exercise-action';

type Props = {
  params: Promise<{ id: string }>;
};
export default async function EditExercisePage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography as="h1">Edit exercise</Typography>
        <form action={deleteExercise}>
          <input type="hidden" name="id" value={id} />
          <Button variant="danger" type="submit">
            Delete
          </Button>
        </form>
      </Box>
      <Section>
        <Suspense fallback="loading">
          <EditExercise id={id} />
        </Suspense>
      </Section>
    </div>
  );
}
