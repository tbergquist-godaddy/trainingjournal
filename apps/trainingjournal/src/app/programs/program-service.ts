import { prisma } from '../services/prisma';
import { getSSRUserId } from '../auth/ssr-session';
export { type Program } from '@prisma/client';

type CreateProgram = {
  name: string;
};

export async function createProgram({ name }: CreateProgram) {
  console.log('Creating program', name);
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }

  return prisma.program.create({ data: { name, userId } });
}

export async function getPrograms() {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  return prisma.program.findMany({ where: { userId } });
}
