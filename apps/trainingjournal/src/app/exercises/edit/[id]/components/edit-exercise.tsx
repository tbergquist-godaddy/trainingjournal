import editExercise from '../actions/edit-exercise-action';
import ExerciseForm from '../../../components/exercise-form';
import { getExercise } from '../../../../services/exercises/exercise-service';
import { ReactNode } from 'react';

type Props = {
  id: string;
  extraActions?: ReactNode;
};

export default async function EditExercise({ id, extraActions }: Props) {
  const exercise = await getExercise(id);
  if (!exercise) {
    return <div>No exercise with id: {id} found</div>;
  }
  return <ExerciseForm defaultValues={exercise} action={editExercise} actionText="Edit exercise" extraActions={extraActions} />;
}
