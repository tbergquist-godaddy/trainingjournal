import {
  getExercises,
  getExercise,
  deleteExercise,
  createExercise,
  updateExercise,
  getJournalEntriesForExercise,
} from '../exercise-service';
import { prisma } from '../../../services/prisma';
import { getSSRUserId } from '../../../auth/ssr-session';
import userExerciseMap from '../__fixtures__/exercises';

// Mock dependencies
jest.mock('../../../services/prisma', () => ({
  prisma: {
    exercise: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    journalEntry: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock('../../../auth/ssr-session', () => ({
  getSSRUserId: jest.fn(),
}));

const mockPrisma = prisma as jest.Mocked<typeof prisma>;
const mockGetSSRUserId = getSSRUserId as jest.MockedFunction<typeof getSSRUserId>;

const testUserId = 'a580a15e-3ef4-4123-9526-076ad4e8b7a0';
const testExercises = userExerciseMap[testUserId];

describe('exercise-service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getExercises', () => {
    it('should return exercises for authenticated user', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.exercise.findMany.mockResolvedValue(testExercises);

      const result = await getExercises();

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.findMany).toHaveBeenCalledWith({
        where: { userId: testUserId },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(testExercises);
    });

    it('should return empty array when user is not authenticated', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      const result = await getExercises();

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.findMany).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getExercise', () => {
    const exerciseId = '1';

    it('should return exercise for authenticated user', async () => {
      const exercise = testExercises[0];
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.exercise.findUnique.mockResolvedValue(exercise);

      const result = await getExercise(exerciseId);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.findUnique).toHaveBeenCalledWith({
        where: { userId: testUserId, id: exerciseId },
      });
      expect(result).toEqual(exercise);
    });

    it('should return null when user is not authenticated', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      const result = await getExercise(exerciseId);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.findUnique).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null when exercise is not found', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.exercise.findUnique.mockResolvedValue(null);

      const result = await getExercise('nonexistent-id');

      expect(result).toBeNull();
    });
  });

  describe('deleteExercise', () => {
    const exerciseId = '1';

    it('should delete exercise for authenticated user', async () => {
      const deletedExercise = testExercises[0];
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.exercise.delete.mockResolvedValue(deletedExercise);

      const result = await deleteExercise(exerciseId);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.delete).toHaveBeenCalledWith({
        where: { id: exerciseId, userId: testUserId },
      });
      expect(result).toEqual(deletedExercise);
    });

    it('should throw error when user is not authenticated', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      await expect(deleteExercise(exerciseId)).rejects.toThrow('User not found');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.delete).not.toHaveBeenCalled();
    });
  });

  describe('createExercise', () => {
    const newExercise = { name: 'New Exercise' };

    it('should create exercise for authenticated user', async () => {
      const createdExercise = { id: '6', ...newExercise };
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.exercise.create.mockResolvedValue(createdExercise);

      const result = await createExercise(newExercise);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.create).toHaveBeenCalledWith({
        data: { ...newExercise, userId: testUserId },
      });
      expect(result).toEqual(createdExercise);
    });

    it('should throw error when user is not authenticated', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      await expect(createExercise(newExercise)).rejects.toThrow('User not found');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.create).not.toHaveBeenCalled();
    });
  });

  describe('updateExercise', () => {
    const exerciseToUpdate = { id: '1', name: 'Updated Exercise' };

    it('should update exercise for authenticated user', async () => {
      const updatedExercise = { ...exerciseToUpdate };
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.exercise.update.mockResolvedValue(updatedExercise);

      const result = await updateExercise(exerciseToUpdate);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.update).toHaveBeenCalledWith({
        where: { id: exerciseToUpdate.id, userId: testUserId },
        data: exerciseToUpdate,
      });
      expect(result).toEqual(updatedExercise);
    });

    it('should throw error when user is not authenticated', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      await expect(updateExercise(exerciseToUpdate)).rejects.toThrow('User not found');

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.exercise.update).not.toHaveBeenCalled();
    });
  });

  describe('getJournalEntriesForExercise', () => {
    const exerciseId = '1';
    const mockJournalEntries = [
      {
        id: 'entry-1',
        exerciseId: '1',
        workoutId: 'workout-1',
        reps: '10',
        weight: '100',
        workout: {
          id: 'workout-1',
          date: new Date('2023-12-01'),
          Day: {
            name: 'Push Day',
            Week: {
              name: 'Week 1',
              Program: {
                name: 'Test Program',
              },
            },
          },
        },
        exercise: {
          id: '1',
          name: 'Bench Press',
        },
      },
      {
        id: 'entry-2',
        exerciseId: '1',
        workoutId: 'workout-2',
        reps: '8',
        weight: '110',
        workout: {
          id: 'workout-2',
          date: new Date('2023-11-30'),
          Day: {
            name: 'Push Day',
            Week: {
              name: 'Week 1',
              Program: {
                name: 'Test Program',
              },
            },
          },
        },
        exercise: {
          id: '1',
          name: 'Bench Press',
        },
      },
    ];

    it('should return paginated journal entries for authenticated user with default pagination', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.journalEntry.count.mockResolvedValue(15);
      mockPrisma.journalEntry.findMany.mockResolvedValue(mockJournalEntries);

      const result = await getJournalEntriesForExercise(exerciseId);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.journalEntry.count).toHaveBeenCalledWith({
        where: {
          exerciseId,
          workout: { userId: testUserId },
        },
      });
      expect(mockPrisma.journalEntry.findMany).toHaveBeenCalledWith({
        where: {
          exerciseId,
          workout: { userId: testUserId },
        },
        include: {
          workout: {
            select: {
              id: true,
              date: true,
              Day: {
                select: {
                  name: true,
                  Week: {
                    select: {
                      name: true,
                      Program: {
                        select: { name: true },
                      },
                    },
                  },
                },
              },
            },
          },
          exercise: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          {
            workout: {
              date: 'desc',
            },
          },
          {
            id: 'desc',
          },
        ],
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({
        journalEntries: mockJournalEntries,
        currentPage: 1,
        hasNextPage: true, // 15 total, 10 per page = 2 pages
        hasPreviousPage: false,
        totalCount: 15,
      });
    });

    it('should return paginated journal entries with custom pagination parameters', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.journalEntry.count.mockResolvedValue(25);
      mockPrisma.journalEntry.findMany.mockResolvedValue(mockJournalEntries);

      const result = await getJournalEntriesForExercise(exerciseId, {
        pageSize: 5,
        page: 3,
      });

      expect(mockPrisma.journalEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10, // (page 3 - 1) * pageSize 5
          take: 5,
        })
      );
      expect(result).toEqual({
        journalEntries: mockJournalEntries,
        currentPage: 3,
        hasNextPage: true, // 25 total, 5 per page = 5 pages, page 3 < 5
        hasPreviousPage: true, // page 3 > 1
        totalCount: 25,
      });
    });

    it('should handle last page correctly', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.journalEntry.count.mockResolvedValue(15);
      mockPrisma.journalEntry.findMany.mockResolvedValue([mockJournalEntries[0]]);

      const result = await getJournalEntriesForExercise(exerciseId, {
        pageSize: 10,
        page: 2,
      });

      expect(result).toEqual({
        journalEntries: [mockJournalEntries[0]],
        currentPage: 2,
        hasNextPage: false, // 15 total, 10 per page = 2 pages, page 2 = last page
        hasPreviousPage: true, // page 2 > 1
        totalCount: 15,
      });
    });

    it('should return empty result when user is not authenticated', async () => {
      mockGetSSRUserId.mockResolvedValue(null);

      const result = await getJournalEntriesForExercise(exerciseId);

      expect(mockGetSSRUserId).toHaveBeenCalledTimes(1);
      expect(mockPrisma.journalEntry.count).not.toHaveBeenCalled();
      expect(mockPrisma.journalEntry.findMany).not.toHaveBeenCalled();
      expect(result).toEqual({
        journalEntries: [],
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    });

    it('should handle empty results', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.journalEntry.count.mockResolvedValue(0);
      mockPrisma.journalEntry.findMany.mockResolvedValue([]);

      const result = await getJournalEntriesForExercise(exerciseId);

      expect(result).toEqual({
        journalEntries: [],
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0,
      });
    });

    it('should handle single page of results', async () => {
      mockGetSSRUserId.mockResolvedValue(testUserId);
      mockPrisma.journalEntry.count.mockResolvedValue(5);
      mockPrisma.journalEntry.findMany.mockResolvedValue(mockJournalEntries);

      const result = await getJournalEntriesForExercise(exerciseId);

      expect(result).toEqual({
        journalEntries: mockJournalEntries,
        currentPage: 1,
        hasNextPage: false, // 5 total, 10 per page = 1 page
        hasPreviousPage: false,
        totalCount: 5,
      });
    });
  });
}); 