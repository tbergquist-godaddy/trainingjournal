/*
  Warnings:

  - A unique constraint covering the columns `[dayId]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Workout_dayId_key` ON `Workout`(`dayId`);
