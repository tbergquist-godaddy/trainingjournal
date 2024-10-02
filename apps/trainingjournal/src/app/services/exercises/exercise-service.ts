import exercises from './__fixtures__/exercises';
import { IExercise } from './types';

export const getExercises = async (
  userId: string
): Promise<Array<IExercise> | undefined> => {
  return Promise.resolve(exercises[userId]);
};
