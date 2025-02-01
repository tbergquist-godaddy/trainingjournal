import { getSSRUserId } from '@/auth/ssr-session';
import { prisma } from '@/services/prisma';

export async function createWorkout(dayId?: string | undefined) {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('Unauthorized');
  }
  return prisma.workout.create({
    data: {
      userId,
      date: new Date(),
      dayId,
    },
  });
}

export type Workout = ReturnType<typeof getWorkoutById>;

export async function getWorkoutById(id: string) {
  const userId = (await getSSRUserId()) ?? '';

  return prisma.workout.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      JournalEntry: true,
      Day: {
        include: {
          PlannedExercise: {
            include: {
              exercise: true,
            },
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
  });
}

type Options = {
  pageSize?: number;
  page?: number;
};
export type GetWorkouts = ReturnType<typeof getWorkouts>;
export async function getWorkouts({ pageSize = 10, page = 1 }: Options = {}) {
  const userId = (await getSSRUserId()) ?? '';

  const [count, workouts] = await Promise.all([
    prisma.workout.count({ where: { userId } }),
    prisma.workout.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        date: true,
        Day: {
          select: {
            name: true,
            Week: {
              select: {
                Program: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    }),
  ]);
  const pages = Math.ceil(count / pageSize);
  return {
    workouts,
    currentPage: page,
    hasNextPage: page < pages,
    hasPreviousPage: page > 1,
  };
}
