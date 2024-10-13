'use server';
import * as z from 'zod';
import { deleteExercise } from '../../../../services/exercises/exercise-service';
import { redirect } from 'next/navigation';

const deleteExerciseSchema = z.object({
  id: z.string().min(1, 'Id is required'),
});
export default async function editExerciseAction(
  data: FormData
): Promise<void> {
  try {
    const { id } = deleteExerciseSchema.parse({ id: data.get('id') });
    await deleteExercise(id);
  } catch (e) {
    console.log({ e });
  }
  redirect('/exercises');
}
