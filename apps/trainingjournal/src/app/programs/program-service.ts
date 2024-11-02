import { prisma } from '../services/prisma';
import { getSSRUserId } from '../auth/ssr-session';
import { type Program as _Program } from '@prisma/client';

export type Program = _Program;

type CreateProgram = {
  name: string;
};

type EditProgram = Omit<Program, 'userId'>;

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

export async function getProgram(id: string) {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  return prisma.program.findUnique({ where: { userId, id } });
}

export async function editProgram(program: EditProgram) {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  return prisma.program.update({
    where: {
      userId,
      id: program.id,
    },
    data: program,
  });
}

export async function deleteProgram(id: string) {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  return prisma.program.delete({ where: { id, userId } });
}
