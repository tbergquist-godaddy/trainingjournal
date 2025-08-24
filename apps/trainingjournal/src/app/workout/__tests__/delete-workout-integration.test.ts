import { deleteWorkoutAction } from '../action/workout-actions';
import { deleteWorkout } from '../workout-service';
import { prisma } from '../../services/prisma';
import { getSSRUserId } from '../../auth/ssr-session';
import { redirect } from 'next/navigation';

// Mock all dependencies
jest.mock('../../services/prisma', () => ({
  prisma: {
    workout: {
      delete: jest.fn(),
    },
  },
}));

jest.mock('../../auth/ssr-session', () => ({
  getSSRUserId: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockGetSSRUserId = getSSRUserId as jest.MockedFunction<typeof getSSRUserId>;
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;

describe('Delete Workout Integration Tests', () => {
  const testUserId = 'test-user-id';
  const testWorkoutId = 'test-workout-id';
  
  const mockWorkout = {
    id: testWorkoutId,
    userId: testUserId,
    date: new Date('2023-12-01'),
    dayId: 'test-day-id',
  };

  const createFormData = (workoutId: string) => {
    const formData = new FormData();
    formData.append('workoutId', workoutId);
    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Successful delete workflow', () => {
    it('should complete full delete workflow successfully', async () => {
      // Setup mocks for successful flow
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.workout.delete.mockResolvedValue(mockWorkout);
      
      // Mock redirect to simulate Next.js redirect behavior
      let redirectCalled = false;
      mockRedirect.mockImplementation(() => {
        redirectCalled = true;
        throw new Error('NEXT_REDIRECT');
      });

      const formData = createFormData(testWorkoutId);

      // Execute the action and handle redirect
      try {
        await deleteWorkoutAction(null, formData);
        expect(redirectCalled).toBe(true);
      } catch (error) {
        expect(error.message).toBe('NEXT_REDIRECT');
        expect(redirectCalled).toBe(true);
      }

      // Verify the complete flow
      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).toHaveBeenCalledWith({
        where: {
          id: testWorkoutId,
          userId: testUserId,
        },
      });
      expect(mockRedirect).toHaveBeenCalledWith('/workout');
    });

    it('should handle cascade deletion of journal entries', async () => {
      // This test verifies that the service layer properly relies on database CASCADE
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.workout.delete.mockResolvedValue(mockWorkout);

      const result = await deleteWorkout(testWorkoutId);

      // Verify only workout.delete is called (journal entries deleted by CASCADE)
      expect(mockPrisma.workout.delete).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).toHaveBeenCalledWith({
        where: {
          id: testWorkoutId,
          userId: testUserId,
        },
      });
      expect(result).toEqual(mockWorkout);
    });
  });

  describe('Authentication failure scenarios', () => {
    it('should handle unauthenticated user in complete workflow', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      const formData = createFormData(testWorkoutId);
      
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('Authorization failure scenarios', () => {
    it('should handle workout not found (wrong user or non-existent)', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      const prismaError = new Error('Record to delete does not exist.');
      mockPrisma.workout.delete.mockRejectedValue(prismaError);

      const formData = createFormData('non-existent-workout-id');
      
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).toHaveBeenCalledWith({
        where: {
          id: 'non-existent-workout-id',
          userId: testUserId,
        },
      });
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(prismaError);

      consoleSpy.mockRestore();
    });

    it('should handle workout belonging to different user', async () => {
      mockGetSSRUserId.mockResolvedValue('different-user-id');
      const prismaError = new Error('Record to delete does not exist.');
      mockPrisma.workout.delete.mockRejectedValue(prismaError);

      const formData = createFormData(testWorkoutId);
      
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).toHaveBeenCalledWith({
        where: {
          id: testWorkoutId,
          userId: 'different-user-id',
        },
      });
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(mockRedirect).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Input validation scenarios', () => {
    it('should handle missing workoutId in form data', async () => {
      const formData = new FormData();
      // Don't append workoutId
      
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockGetSSRUserId).not.toHaveBeenCalled();
      expect(mockPrisma.workout.delete).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should handle empty workoutId in form data', async () => {
      const formData = createFormData('');
      
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      // With Zod validation, empty string should be caught before reaching service layer
      expect(mockGetSSRUserId).not.toHaveBeenCalled();
      expect(mockPrisma.workout.delete).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Database error scenarios', () => {
    it('should handle database connection errors', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      const dbError = new Error('Database connection failed');
      mockPrisma.workout.delete.mockRejectedValue(dbError);

      const formData = createFormData(testWorkoutId);
      
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.workout.delete).toHaveBeenCalledWith({
        where: {
          id: testWorkoutId,
          userId: testUserId,
        },
      });
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(mockRedirect).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(dbError);

      consoleSpy.mockRestore();
    });
  });
});
