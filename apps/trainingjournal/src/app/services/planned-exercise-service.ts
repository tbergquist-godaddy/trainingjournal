import { getSSRUserId } from '@/auth/ssr-session';
import { prisma } from './prisma';

export const getPlannedExercises = async (dayId: string) => {
  const userId = (await getSSRUserId()) ?? '';
  return prisma.plannedExercise.findMany({
    where: {
      dayId,
      Day: {
        Week: {
          Program: {
            userId,
          },
        },
      },
    },
    include: {
      exercise: true,
    },
    orderBy: {
      order: 'asc',
    },
  });
};

export type PlannedExercise = ReturnType<typeof getPlannedExercises>;

type CreatePlannedExerciseInput = {
  dayId: string;
  exerciseId: string;
  sets: string;
  reps: string;
  description?: string;
};
export const createPlannedExercise = async (input: CreatePlannedExerciseInput) => {
  const userId = (await getSSRUserId()) ?? '';
  const { dayId, exerciseId, sets, reps, description } = input;
  const day = await prisma.day.findFirstOrThrow({
    where: {
      id: dayId,
      Week: {
        Program: {
          userId,
        },
      },
    },
    select: {
      PlannedExercise: true,
    },
  });
  return prisma.plannedExercise.create({
    data: {
      dayId,
      exerciseId,
      sets,
      reps,
      description,
      order: day?.PlannedExercise.length + 1,
    },
  });
};

export const deletePlannedExercise = async (plannedExerciseId: string) => {
  const userId = (await getSSRUserId()) ?? '';
  const day = await prisma.day.findFirst({
    where: {
      PlannedExercise: {
        some: {
          id: plannedExerciseId,
          Day: {
            Week: {
              Program: {
                userId,
              },
            },
          },
        },
      },
    },
    select: {
      id: true,
      PlannedExercise: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
  let count = 1;
  const plannedExercises = (day?.PlannedExercise ?? [])
    .map(item => {
      if (item.id === plannedExerciseId) {
        return null;
      }
      return {
        ...item,
        order: count++,
      };
    })
    .filter(Boolean);
  await prisma.$transaction([
    prisma.plannedExercise.delete({
      where: {
        id: plannedExerciseId,
        Day: {
          Week: {
            Program: {
              userId,
            },
          },
        },
      },
    }),
    ...plannedExercises.map(item =>
      prisma.plannedExercise.update({
        where: {
          id: item?.id,
        },
        data: item ?? {},
      }),
    ),
  ]);
};

export const reorderPlannedExercise = async (
  plannedExerciseId: string,
  direction: 'UP' | 'DOWN',
) => {
  const userId = (await getSSRUserId()) ?? '';
  const day = await prisma.day.findFirstOrThrow({
    where: {
      PlannedExercise: {
        some: {
          id: plannedExerciseId,
          Day: {
            Week: {
              Program: {
                userId,
              },
            },
          },
        },
      },
    },
    select: {
      PlannedExercise: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
  const plannedExercises = day?.PlannedExercise ?? [];
  const index = plannedExercises.findIndex(item => item.id === plannedExerciseId);
  if (index === -1) {
    return;
  }
  const newIndex = direction === 'UP' ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= plannedExercises.length) {
    return;
  }
  const temp = plannedExercises[index].order;
  plannedExercises[index].order = plannedExercises[newIndex].order;
  plannedExercises[newIndex].order = temp;
  await prisma.$transaction(
    plannedExercises.map(item =>
      prisma.plannedExercise.update({
        where: {
          id: item.id,
        },
        data: {
          order: item.order,
        },
      }),
    ),
  );
};
