import { getSSRUserId } from '@/auth/ssr-session';
import { prisma } from '@/services/prisma';
import { JournalEntry } from '@prisma/client';

export async function createJournalEntry(journalEntry: Omit<JournalEntry, 'id'>) {
  const userId = (await getSSRUserId()) ?? undefined;
  const workout = await prisma.workout.findFirst({
    where: {
      userId,
      id: journalEntry.workoutId,
    },
  });

  if (!workout) {
    throw new Error('Unauthorized');
  }
  return prisma.journalEntry.create({
    data: journalEntry,
  });
}
