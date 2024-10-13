import { getSSRUserId } from '../../auth/ssr-session';
import exercises from './__fixtures__/exercises';
import { IExercise } from './types';
import { setTimeout } from 'node:timers/promises';

export const getExercises = async (): Promise<Array<IExercise> | undefined> => {
  const userId = await getSSRUserId();
  if (userId == null) {
    return [];
  }
  return Promise.resolve(exercises[userId]);
};

export const getExercise = async (id: string): Promise<IExercise | null> => {
  const userId = await getSSRUserId();
  if (userId == null) {
    return null;
  }
  return Promise.resolve(
    exercises[userId].find((exercise) => exercise.id === id) || null
  );
};

export const deleteExercise = async (id: string) => {
  await setTimeout(1500);
  const exercise = await getExercise(id);
  if (!exercise) {
    throw new Error('Exercise not found');
  }
  return exercise;
};

export const createExercise = async (exercise: Omit<IExercise, 'id'>) => {
  await setTimeout(3000);
  return Promise.resolve({
    name: exercise.name,
    id: `${Math.floor(Math.random() * 1000)}`,
  });
};

export const updateExercise = async (exercise: IExercise) => {
  await setTimeout(3000);
  return Promise.resolve(exercise);
};
