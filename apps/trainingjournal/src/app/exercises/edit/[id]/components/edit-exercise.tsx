import editExercise from '../actions/edit-exercise-action';
import ExerciseForm from '../../../components/exercise-form';
import { getExercise } from '../../../../services/exercises/exercise-service';

type Props = {
  id: string;
};

export default async function EditExercise({ id }: Props) {
  const exercise = await getExercise(id);
  if (!exercise) {
    return <div>No exercise with id: {id} found</div>;
  }
  console.log({ exercise });
  return <ExerciseForm defaultValues={exercise} action={editExercise} actionText="Edit exercise" />;
}
