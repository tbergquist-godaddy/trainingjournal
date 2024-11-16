import { prisma } from '../services/prisma';
import { getSSRUserId } from '../auth/ssr-session';
import { type Program as _Program } from '@prisma/client';

export type Program = _Program;

type CreateProgram = {
  name: string;
};

type EditProgram = Omit<Program, 'userId'>;

async function getUserId() {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  return userId;
}

export async function createProgram({ name }: CreateProgram) {
  const userId = await getUserId();

  return prisma.program.create({ data: { name, userId } });
}

export async function getPrograms() {
  const userId = await getUserId();
  return prisma.program.findMany({ where: { userId } });
}

export async function hasAccessToProgram(programId: string) {
  try {
    const userId = await getUserId();
    const program = await prisma.program.findUnique({
      where: { id: programId, userId },
      select: { id: true },
    });
    return program != null;
  } catch {
    return false;
  }
}

export async function getProgram(id: string) {
  const userId = await getUserId();
  return prisma.program.findUnique({ where: { userId, id } });
}

export async function editProgram(program: EditProgram) {
  const userId = await getUserId();
  return prisma.program.update({
    where: {
      userId,
      id: program.id,
    },
    data: program,
  });
}

export async function deleteProgram(id: string) {
  const userId = await getUserId();
  return prisma.program.delete({ where: { id, userId } });
}
