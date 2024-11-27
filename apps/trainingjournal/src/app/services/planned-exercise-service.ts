import { getSSRUserId } from '@/auth/ssr-session';
import { prisma } from './prisma';

export const getPlannedExercises = async (dayId: string) => {
  const userId = (await getSSRUserId()) ?? '';
  return prisma.plannedExercise.findMany({
    where: {
      dayId,
      Day: {
        Week: {
          Program: {
            userId,
          },
        },
      },
    },
    include: {
      exercise: true,
    },
  });
};
