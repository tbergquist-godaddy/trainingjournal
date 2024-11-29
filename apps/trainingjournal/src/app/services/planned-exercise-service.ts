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

export type PlannedExercise = ReturnType<typeof getPlannedExercises>;

type CreatePlannedExerciseInput = {
  dayId: string;
  exerciseId: string;
  sets: string;
  reps: string;
  description?: string;
};
export const createPlannedExercise = async (input: CreatePlannedExerciseInput) => {
  const userId = (await getSSRUserId()) ?? '';
  const { dayId, exerciseId, sets, reps, description } = input;
  prisma.day.findFirstOrThrow({
    where: {
      id: dayId,
      Week: {
        Program: {
          userId,
        },
      },
    },
  });
  return prisma.plannedExercise.create({
    data: {
      dayId,
      exerciseId,
      sets,
      reps,
      description,
    },
  });
};

export const deletePlannedExercise = async (plannedExerciseId: string) => {
  const userId = (await getSSRUserId()) ?? '';

  return prisma.plannedExercise.delete({
    where: {
      id: plannedExerciseId,
      Day: {
        Week: {
          Program: {
            userId,
          },
        },
      },
    },
  });
};
