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

      const result = await deleteWorkoutAction(null, formData);

      expect(mockDeleteWorkout).toHaveBeenCalledWith(workoutId);
      expect(result).toEqual({
        success: true,
        message: 'Workout deleted successfully',
      });
      expect(mockRedirect).toHaveBeenCalledWith('/workout');
    });

    it('should handle service errors and redirect', async () => {
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
      expect(mockRedirect).toHaveBeenCalledWith('/workout');

      consoleSpy.mockRestore();
    });

    it('should handle invalid workoutId and redirect', async () => {
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
      expect(mockRedirect).toHaveBeenCalledWith('/workout');

      consoleSpy.mockRestore();
    });

    it('should handle empty workoutId and redirect', async () => {
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
      expect(mockRedirect).toHaveBeenCalledWith('/workout');

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
      expect(mockRedirect).toHaveBeenCalledWith('/workout');

      consoleSpy.mockRestore();
    });
  });
});
