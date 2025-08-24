import { deleteWorkoutAction, createWorkoutAction } from '../workout-actions';
import { deleteWorkout, createWorkout } from '../../workout-service';
import { redirect } from 'next/navigation';

// Mock dependencies
jest.mock('../../workout-service', () => ({
  deleteWorkout: jest.fn(),
  createWorkout: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

const mockDeleteWorkout = deleteWorkout as jest.MockedFunction<typeof deleteWorkout>;
const mockCreateWorkout = createWorkout as jest.MockedFunction<typeof createWorkout>;
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;

describe('workout-actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteWorkoutAction', () => {
    const createFormData = (workoutId: string) => {
      const formData = new FormData();
      formData.append('workoutId', workoutId);
      return formData;
    };

    it('should successfully delete workout and redirect', async () => {
      const workoutId = 'test-workout-id';
      const mockWorkout = {
        id: workoutId,
        userId: 'test-user-id',
        date: new Date(),
        dayId: 'test-day-id',
      };

      mockDeleteWorkout.mockResolvedValue(mockWorkout);
      const formData = createFormData(workoutId);

      // For successful case, we expect the function to call redirect and not return
      // Since redirect() in Next.js throws internally, we'll test by checking if redirect was called
      let redirectCalled = false;
      mockRedirect.mockImplementation(() => {
        redirectCalled = true;
        // Simulate Next.js redirect behavior by throwing
        throw new Error('NEXT_REDIRECT');
      });

      try {
        await deleteWorkoutAction(null, formData);
        // If we get here without redirect being called, the test should fail
        expect(redirectCalled).toBe(true);
      } catch (error) {
        // Expect the redirect error to be thrown
        expect(error.message).toBe('NEXT_REDIRECT');
        expect(redirectCalled).toBe(true);
      }

      expect(mockDeleteWorkout).toHaveBeenCalledWith(workoutId);
      expect(mockRedirect).toHaveBeenCalledWith('/workout');
    });

    it('should handle service errors and return error response', async () => {
      const workoutId = 'test-workout-id';
      const serviceError = new Error('Unauthorized');

      mockDeleteWorkout.mockRejectedValue(serviceError);
      const formData = createFormData(workoutId);

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockDeleteWorkout).toHaveBeenCalledWith(workoutId);
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(consoleSpy).toHaveBeenCalledWith(serviceError);
      expect(mockRedirect).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should handle invalid workoutId and return error response', async () => {
      const formData = new FormData();
      // Don't append workoutId to simulate missing field

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockDeleteWorkout).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(consoleSpy).toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should handle empty workoutId and return error response', async () => {
      const formData = createFormData('');

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockDeleteWorkout).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(consoleSpy).toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should handle Prisma record not found error', async () => {
      const workoutId = 'non-existent-workout-id';
      const prismaError = new Error('Record to delete does not exist.');

      mockDeleteWorkout.mockRejectedValue(prismaError);
      const formData = createFormData(workoutId);

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await deleteWorkoutAction(null, formData);

      expect(mockDeleteWorkout).toHaveBeenCalledWith(workoutId);
      expect(result).toEqual({
        success: false,
        message: 'Failed to delete workout',
      });
      expect(consoleSpy).toHaveBeenCalledWith(prismaError);
      expect(mockRedirect).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
