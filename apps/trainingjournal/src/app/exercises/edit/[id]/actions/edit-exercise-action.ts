'use server';

import { revalidatePath } from 'next/cache';
import { updateExercise } from '../../../../services/exercises/exercise-service';
import { Exercise } from '../../../components/exercise-form';
import { exerciseSchema } from '../../../schema/exercise-schema';
import * as z from 'zod';

export type State =
  | {
      status: 'success';
      exercise: Exercise;
    }
  | {
      status: 'error';
      error: string;
    };
export default async function editExerciseAction(data: FormData): Promise<State> {
  const name = data.get('name');
  const id = data.get('id');
  try {
    const exercise = exerciseSchema.extend({ id: z.string().min(1, 'Id is required') }).parse({ name, id });
    const createdExercise = await updateExercise(exercise);
    revalidatePath('/exercises');
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
