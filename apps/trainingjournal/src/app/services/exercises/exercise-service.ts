import { getSSRUserId } from '../../auth/ssr-session';
import { prisma } from '../../services/prisma';
import { type Exercise } from '@prisma/client';

type IExercise = Omit<Exercise, 'userId'>;

export const getExercises = async () => {
  const userId = await getSSRUserId();
  if (userId == null) {
    return [];
  }
  return prisma.exercise.findMany({
    where: {
      userId,
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
