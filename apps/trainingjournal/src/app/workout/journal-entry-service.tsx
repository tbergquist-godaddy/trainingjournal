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

export type GetLatestJournalEntries = ReturnType<typeof getLatestJournalEntries>;

export async function getLatestJournalEntries(exerciseId: string) {
  const userId = (await getSSRUserId()) ?? undefined;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const workout = await prisma.workout.findFirst({
    where: {
      userId,
      date: {
        lt: today,
      },
      JournalEntry: {
        some: {
          exerciseId,
        },
      },
    },
    select: {
      JournalEntry: true,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return workout?.JournalEntry.filter(entry => entry.exerciseId === exerciseId);
}
