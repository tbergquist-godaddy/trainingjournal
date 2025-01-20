'use server';

import { createWorkout } from '../workout-service';
import * as z from 'zod';
import { redirect } from 'next/navigation';

const dayIdSchema = z.string().optional();

export async function createWorkoutAction(_: unknown, formData: FormData) {
  let workoutId;
  try {
    const dayId = await dayIdSchema.parseAsync(formData.get('dayId'));
    const workout = await createWorkout(dayId);

    if (!workout) {
      throw new Error('Failed to create workout');
    }
    workoutId = workout.id;
    return {
      success: true,
      workout,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: 'Failed to create workout',
    };
  } finally {
    if (workoutId != null) {
      redirect(`/workout/register/${workoutId}`);
    }
  }
}
