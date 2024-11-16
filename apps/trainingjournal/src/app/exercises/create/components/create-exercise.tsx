import createExercise from './create-exercise-action';
import ExerciseForm from '../../components/exercise-form';

export default function CreateExercise() {
  return <ExerciseForm defaultValues={{ name: '' }} action={createExercise} actionText="Create exercise" />;
}
