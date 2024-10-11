import exercises from './__fixtures__/exercises';
import { IExercise } from './types';
import { setTimeout } from 'node:timers/promises';

export const getExercises = (
  userId: string
): Promise<Array<IExercise> | undefined> => {
  return Promise.resolve(exercises[userId]);
};

export const createExercise = async (exercise: Omit<IExercise, 'id'>) => {
  await setTimeout(3000);
  return Promise.resolve({
    name: exercise.name,
    id: `${Math.floor(Math.random() * 1000)}`,
  });
};
