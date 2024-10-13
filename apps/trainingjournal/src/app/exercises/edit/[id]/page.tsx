import { Suspense } from 'react';
import Section from '../../../components/layout/section';
import Typography from '../../../components/typography/typography';
import EditExercise from './components/edit-exercise';
import Box from '../../../components/box/box';
import Button from '../../../components/button/button';
import deleteExercise from './actions/delete-exercise-action';

type Props = {
  params: { id: string };
};
export default function EditExercisePage({ params: { id } }: Props) {
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
