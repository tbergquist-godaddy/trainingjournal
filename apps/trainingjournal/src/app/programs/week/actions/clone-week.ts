'use server';

import * as z from 'zod';
import { cloneWeek } from '@/programs/week/week-service';
import { revalidatePath } from 'next/cache';

const cloneWeekSchema = z.object({
  weekId: z.string().min(1, 'Week ID is required'),
});

export default async function cloneWeekAction(_: unknown, data: FormData) {
  try {
    const { weekId } = await cloneWeekSchema.parse({
      weekId: data.get('weekId'),
    });
    const week = await cloneWeek(weekId);
    revalidatePath('/programs/edit/[id]', 'page');
    return {
      success: true,
      week,
    };
  } catch {
    return {
      success: false,
      message: 'An error occurred',
    };
  }
}
