import { setTimeout } from 'node:timers/promises';

type Program = {
  name: string;
};
export async function createProgram({ name }: Program): Promise<null> {
  console.log('Creating program', name);
  await setTimeout(2000);
  return null;
}
