'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';
import { createProgram } from '../program-service';

const programSchema = z.object({
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

export default async function createProgramAction(data: FormData): Promise<State> {
  const name = data.get('name');

  try {
    const program = programSchema.parse({ name });
    await createProgram(program);
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
