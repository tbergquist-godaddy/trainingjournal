'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { editProgram } from '../program-service';

const programSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
});
export type State =
  | {
      status: 'success';
    }
  | {
      status: 'error';
      error: string;
    }
  | {
      status: 'pending';
    };

export default async function editProgramAction(
  data: FormData
): Promise<State> {
  const name = data.get('name');
  const id = data.get('id');
  try {
    const program = programSchema.parse({ name, id });
    await editProgram(program);
    revalidatePath('/programs');
    return {
      status: 'success',
    };
  } catch (e) {
    console.log({ e });
    return {
      status: 'error',
      error: 'TODO',
    };
  }
}
