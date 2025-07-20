import { getSSRUserId } from '../../auth/ssr-session';
import { prisma } from '../../services/prisma';
import type { IExercise } from './types';

export const getExercises = async () => {
  const userId = await getSSRUserId();
  if (userId == null) {
    return [];
  }
  return prisma.exercise.findMany({
    where: {
      userId,
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export type Exercises = ReturnType<typeof getExercises>;

export const getExercise = async (id: string) => {
  const userId = await getSSRUserId();
  if (userId == null) {
    return null;
  }
  return prisma.exercise.findUnique({
    where: {
      userId,
      id,
    },
  });
};

export const deleteExercise = async (id: string) => {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  return prisma.exercise.delete({ where: { id, userId } });
};

export const createExercise = async (exercise: Omit<IExercise, 'id'>) => {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  const newExercise = await prisma.exercise.create({
    data: { ...exercise, userId },
  });
  return newExercise;
};

export const updateExercise = async (exercise: IExercise) => {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  return prisma.exercise.update({
    where: { id: exercise.id, userId },
    data: exercise,
  });
};

type JournalEntryOptions = {
  pageSize?: number;
  page?: number;
};

export const getJournalEntriesForExercise = async (
  exerciseId: string,
  { pageSize = 10, page = 1 }: JournalEntryOptions = {}
) => {
  const userId = await getSSRUserId();
  if (userId == null) {
    return {
      journalEntries: [],
      currentPage: page,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  const [count, journalEntries] = await Promise.all([
    prisma.journalEntry.count({
      where: {
        exerciseId,
        workout: {
          userId,
        },
      },
    }),
    prisma.journalEntry.findMany({
      where: {
        exerciseId,
        workout: {
          userId,
        },
      },
      include: {
        workout: {
          select: {
            id: true,
            date: true,
            Day: {
              select: {
                name: true,
                Week: {
                  select: {
                    name: true,
                    Program: {
                      select: { name: true },
                    },
                  },
                },
              },
            },
          },
        },
        exercise: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        {
          workout: {
            date: 'desc',
          },
        },
        {
          id: 'desc',
        },
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const pages = Math.ceil(count / pageSize);
  return {
    journalEntries,
    currentPage: page,
    hasNextPage: page < pages,
    hasPreviousPage: page > 1,
    totalCount: count,
  };
};

export type GetJournalEntriesForExercise = ReturnType<typeof getJournalEntriesForExercise>;

