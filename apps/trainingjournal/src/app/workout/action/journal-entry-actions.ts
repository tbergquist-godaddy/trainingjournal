'use server';

import * as z from 'zod';
import { createJournalEntry } from '../journal-entry-service';
import { revalidatePath } from 'next/cache';

const createJournalEntrySchema = z.object({
  workoutId: z.string().min(1, 'Workout is required'),
  exerciseId: z.string().min(1, 'Exercise is required'),
  reps: z.string().min(1, 'Reps is required'),
  weight: z.string().min(1, 'Weight is required'),
});

export async function createJournalEntryAction(formData: FormData) {
  try {
    const journalEntry = await createJournalEntrySchema.parseAsync({
      workoutId: formData.get('workoutId'),
      exerciseId: formData.get('exerciseId'),
      reps: formData.get('reps'),
      weight: formData.get('weight'),
    });
    const entry = await createJournalEntry(journalEntry);
    revalidatePath('/workout/register/[id]', 'page');
    return entry;
  } catch (error) {
    console.error(error);
    return null;
  }
}
