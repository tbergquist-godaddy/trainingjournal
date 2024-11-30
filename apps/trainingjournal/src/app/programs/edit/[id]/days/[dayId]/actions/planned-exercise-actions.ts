'use server';

import * as z from 'zod';
import {
  createPlannedExercise as create,
  deletePlannedExercise as deletePE,
  reorderPlannedExercise as reOrder,
} from '@/services/planned-exercise-service';
import { revalidatePath } from 'next/cache';

const createPlannedExerciseSchema = z.object({
  exerciseId: z.string().min(1, 'Exercise is required'),
  sets: z.string().min(1, 'Sets must be at least 1'),
  reps: z.string().min(1, 'Reps must be at least 1'),
  dayId: z.string().min(1, 'Day is required'),
  description: z.string(),
});

export async function createPlannedExercise(_: unknown, formData: FormData) {
  try {
    const input = await createPlannedExerciseSchema.parseAsync({
      exerciseId: formData.get('exerciseId'),
      sets: formData.get('sets'),
      reps: formData.get('reps'),
      description: formData.get('description'),
      dayId: formData.get('dayId'),
    });
    await create(input);
    revalidatePath(`/programs/edit/[id]/days/[dayId]`, 'page');
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        status: 'error',
        error: e.errors,
      };
    }
    return {
      status: 'error',
      error: 'TODO',
    };
  }
}

const deletePlannedExerciseSchema = z.object({
  plannedExerciseId: z.string().min(1, 'Planned exercise is required'),
});

export async function deletePlannedExercise(formData: FormData) {
  const { plannedExerciseId } = await deletePlannedExerciseSchema.parseAsync({
    plannedExerciseId: formData.get('plannedExerciseId'),
  });
  await deletePE(plannedExerciseId);
  revalidatePath(`/programs/edit/[id]/days/[dayId]`, 'page');
}

const reorderPlannedExerciseSchema = z.object({
  plannedExerciseId: z.string().min(1, 'Planned exercise is required'),
  direction: z.enum(['UP', 'DOWN']),
});

export async function reorderPlannedExercise(formData: FormData) {
  const { plannedExerciseId, direction } = await reorderPlannedExerciseSchema.parseAsync({
    plannedExerciseId: formData.get('plannedExerciseId'),
    direction: formData.get('direction'),
  });
  await reOrder(plannedExerciseId, direction);
  revalidatePath(`/programs/edit/[id]/days/[dayId]`, 'page');
}
