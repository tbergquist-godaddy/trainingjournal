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

export async function cloneWeek(weekId: string) {
  const userId = (await getSSRUserId()) ?? '';
  const where = {
    id: weekId,
    Program: {
      userId,
    },
  };
  const [week, weekCount] = await Promise.all([
    prisma.week.findUnique({
      where,
      include: {
        days: {
          include: {
            PlannedExercise: true,
          },
        },
      },
    }),
    prisma.week.count({ where: { Program: { is: { weeks: { some: { id: weekId } } } } } }),
  ]);
  if (!week) {
    throw new Error('Unauthorized');
  }
  return prisma.week.create({
    data: {
      name: `Week ${Number(weekCount) + 1}`,
      Program: {
        connect: {
          id: week.programId,
        },
      },
      days: {
        create: week.days.map(day => ({
          name: day.name,
          PlannedExercise: {
            create: day.PlannedExercise.map(exercise => ({
              exerciseId: exercise.exerciseId,
              sets: exercise.sets,
              reps: exercise.reps,
              description: exercise.description,
              order: exercise.order,
            })),
          },
        })),
      },
    },
  });
}

export async function getWeeks(programId: string) {
  const userId = (await getSSRUserId()) ?? '';
  return prisma.week.findMany({
    where: {
      Program: {
        userId,
        id: programId,
      },
    },
    include: {
      days: true,
    },
  });
}

export type GetWeeksType = ReturnType<typeof getWeeks>;
