'use server';

import { createWorkout } from '../workout-service';
import * as z from 'zod';

const dayIdSchema = z
  .string()
  .optional()
  .transform(value => (value?.match(/^freestyle$/i) ? undefined : value));

export async function createWorkoutAction(_: unknown, formData: FormData) {
  try {
    const dayId = await dayIdSchema.parseAsync(formData.get('dayId'));
    const workout = await createWorkout(dayId);
    return {
      success: true,
      workout,
    };
  } catch {
    return {
      success: false,
      message: 'Failed to create workout',
    };
  }
}
