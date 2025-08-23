'use server';

import { createWorkout, deleteWorkout } from '../workout-service';
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

const workoutIdSchema = z.string().min(1, 'Workout ID is required');

export async function deleteWorkoutAction(_: unknown, formData: FormData) {
  try {
    const workoutId = await workoutIdSchema.parseAsync(formData.get('workoutId'));
    await deleteWorkout(workoutId);

    return {
      success: true,
      message: 'Workout deleted successfully',
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: 'Failed to delete workout',
    };
  } finally {
    redirect('/workout');
  }
}
