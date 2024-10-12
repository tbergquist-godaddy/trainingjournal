import { Suspense } from 'react';
import Section from '../../../components/layout/section';
import Typography from '../../../components/typography/typography';
import EditExercise from './components/edit-exercise';

type Props = {
  params: { id: string };
};
export default function EditExercisePage({ params: { id } }: Props) {
  return (
    <div>
      <Typography as="h1">Edit exercise</Typography>
      <Section>
        <Suspense fallback="loading">
          <EditExercise id={id} />
        </Suspense>
      </Section>
    </div>
  );
}
