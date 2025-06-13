'use server';

import * as z from 'zod';
import { updateJournalEntry } from '@/workout/journal-entry-service';
import { revalidatePath } from 'next/cache';

const updateJournalEntrySchema = z.object({
  id: z.string().min(1, 'ID is required'),
  reps: z.string().min(1, 'Reps is required'),
  weight: z.string().min(1, 'Weight is required'),
});

export async function updateJournalEntryAction(formData: FormData) {
  try {
    const journalEntryData = await updateJournalEntrySchema.parseAsync({
      id: formData.get('id'),
      reps: formData.get('reps'),
      weight: formData.get('weight'),
    });

    const entry = await updateJournalEntry(journalEntryData);
    revalidatePath('/workout/[id]', 'page');
    return entry;
  } catch (error) {
    console.error(error);
    return null;
  }
}
