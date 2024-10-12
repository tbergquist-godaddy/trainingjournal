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

export const createExercise = async (exercise: Omit<IExercise, 'id'>) => {
  await setTimeout(3000);
  return Promise.resolve({
    name: exercise.name,
    id: `${Math.floor(Math.random() * 1000)}`,
  });
};
