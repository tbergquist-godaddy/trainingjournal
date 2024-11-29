/*
  Warnings:

  - Added the required column `order` to the `PlannedExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PlannedExercise` ADD COLUMN `order` INTEGER NOT NULL;
