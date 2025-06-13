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

export async function updateJournalEntry(journalEntryData: Partial<JournalEntry> & { id: string }) {
  const userId = (await getSSRUserId()) ?? undefined;
  const { id, ...dataToUpdate } = journalEntryData;

  // Update the journal entry, ensuring it belongs to the current user
  return prisma.journalEntry.update({
    where: {
      id,
      workout: {
        userId,
      },
    },
    data: dataToUpdate,
  });
}

export async function getJournalEntryById(id: string) {
  const userId = (await getSSRUserId()) ?? undefined;

  // Get the journal entry and ensure it belongs to the current user
  const journalEntry = await prisma.journalEntry.findFirst({
    where: {
      id,
      workout: {
        userId,
      },
    },
    include: {
      exercise: true,
      workout: true,
    },
  });

  if (!journalEntry) {
    return null;
  }

  return journalEntry;
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
