'use server';

import { createExercise } from '../../../services/exercises/exercise-service';
import { Exercise } from '../../components/exercise-form';
import { exerciseSchema } from '../../schema/exercise-schema';

export type State =
  | {
      status: 'success';
      exercise: Exercise;
    }
  | {
      status: 'error';
      error: string;
    }
  | {
      status: 'pending';
    };
export default async function createExerciseAction(
  data: FormData
): Promise<State> {
  const name = data.get('name');
  console.log({ name });
  try {
    const exercise = exerciseSchema.parse({ name });
    const createdExercise = await createExercise(exercise);
    return {
      status: 'success',
      exercise: createdExercise,
    };
  } catch (e) {
    console.log({ e });
    return {
      status: 'error',
      error: 'TODO',
    };
  }
}
