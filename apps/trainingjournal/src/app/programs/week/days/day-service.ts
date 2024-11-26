import { prisma } from '@/services/prisma';
import { getSSRUserId } from '@/auth/ssr-session';

type CreateDayInput = {
  weekId: string;
  name: string;
};

export async function createDay(input: CreateDayInput) {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('User not found');
  }
  const program = await prisma.program.findFirst({
    where: {
      userId,
      weeks: {
        some: {
          id: input.weekId,
        },
      },
    },
  });
  if (program != null) {
    return prisma.day.create({
      data: input,
    });
  }
  throw new Error('Unauthorized');
}

export async function getDays(weekId: string) {
  const userId = (await getSSRUserId()) ?? '';
  return prisma.day.findMany({
    where: {
      weekId,
      Week: {
        Program: {
          userId,
        },
      },
    },
  });
}

export async function getDayById(dayId: string) {
  const userId = (await getSSRUserId()) ?? '';
  return prisma.day.findFirst({
    where: {
      id: dayId,
      Week: {
        Program: {
          userId,
        },
      },
    },
  });
}
