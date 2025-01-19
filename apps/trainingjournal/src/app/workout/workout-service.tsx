import { getSSRUserId } from '@/auth/ssr-session';
import { prisma } from '@/services/prisma';

export async function createWorkout(dayId?: string | undefined) {
  const userId = await getSSRUserId();
  if (userId == null) {
    throw new Error('Unauthorized');
  }
  return prisma.workout.create({
    data: {
      userId,
      date: new Date(),
      dayId,
    },
  });
}
