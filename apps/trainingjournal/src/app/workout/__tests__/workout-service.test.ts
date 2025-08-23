import { deleteWorkout, createWorkout, getWorkoutById, getWorkouts } from '../workout-service';
import { prisma } from '../../services/prisma';
import { getSSRUserId } from '../../auth/ssr-session';

// Mock dependencies
jest.mock('../../services/prisma', () => ({
  prisma: {
    workout: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('../../auth/ssr-session', () => ({
  getSSRUserId: jest.fn(),
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockGetSSRUserId = getSSRUserId as jest.MockedFunction<typeof getSSRUserId>;

const testUserId = 'test-user-id';
const testWorkoutId = 'test-workout-id';

const mockWorkout = {
  id: testWorkoutId,
  userId: testUserId,
  date: new Date('2023-12-01'),
  dayId: 'test-day-id',
};

describe('workout-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteWorkout', () => {
    it('should delete workout for authenticated user', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.workout.delete.mockResolvedValue(mockWorkout);

      const result = await deleteWorkout(testWorkoutId);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).toHaveBeenCalledWith({
        where: {
          id: testWorkoutId,
          userId: testUserId,
        },
      });
      expect(result).toEqual(mockWorkout);
    });

    it('should throw error when user is not authenticated', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      await expect(deleteWorkout(testWorkoutId)).rejects.toThrow('Unauthorized');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).not.toHaveBeenCalled();
    });

    it('should throw error when user is undefined', async () => {
      mockGetSSRUserId.mockResolvedValue(undefined);

      await expect(deleteWorkout(testWorkoutId)).rejects.toThrow('Unauthorized');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).not.toHaveBeenCalled();
    });

    it('should propagate Prisma errors when workout not found', async () => {
      const prismaError = new Error('Record to delete does not exist.');
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.workout.delete.mockRejectedValue(prismaError);

      await expect(deleteWorkout(testWorkoutId)).rejects.toThrow('Record to delete does not exist.');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).toHaveBeenCalledWith({
        where: {
          id: testWorkoutId,
          userId: testUserId,
        },
      });
    });

    it('should propagate Prisma errors when workout belongs to different user', async () => {
      const prismaError = new Error('Record to delete does not exist.');
      mockGetSSRUserId.mockResolvedValue('different-user-id');
      mockPrisma.workout.delete.mockRejectedValue(prismaError);

      await expect(deleteWorkout(testWorkoutId)).rejects.toThrow('Record to delete does not exist.');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).toHaveBeenCalledWith({
        where: {
          id: testWorkoutId,
          userId: 'different-user-id',
        },
      });
    });
  });

  describe('createWorkout', () => {
    it('should create workout for authenticated user', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.workout.create.mockResolvedValue(mockWorkout);

      const result = await createWorkout('test-day-id');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.create).toHaveBeenCalledWith({
        data: {
          userId: testUserId,
          date: expect.any(Date),
          dayId: 'test-day-id',
        },
      });
      expect(result).toEqual(mockWorkout);
    });

    it('should throw error when user is not authenticated', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      await expect(createWorkout()).rejects.toThrow('Unauthorized');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.create).not.toHaveBeenCalled();
    });
  });
});
