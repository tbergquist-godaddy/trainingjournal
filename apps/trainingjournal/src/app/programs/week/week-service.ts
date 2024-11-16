import { prisma } from '@/services/prisma';
import { hasAccessToProgram } from '@/programs/program-service';
import { getSSRUserId } from '@/auth/ssr-session';

type CreateWeekInput = {
  programId: string;
  name: string;
};

export async function createWeek(input: CreateWeekInput) {
  if (await hasAccessToProgram(input.programId)) {
    return prisma.week.create({
      data: input,
    });
  }
  throw new Error('Unauthorized');
}

export async function getWeeks(programId: string) {
  const userId = (await getSSRUserId()) ?? '';
  return prisma.program.findUnique({
    where: {
      id: programId,
      userId,
    },
    select: {
      weeks: true,
    },
  });
}
