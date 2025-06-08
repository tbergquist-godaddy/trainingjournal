-- CreateIndex
CREATE INDEX `Exercise_userId_idx` ON `Exercise`(`userId`);

-- CreateIndex
CREATE INDEX `Workout_userId_idx` ON `Workout`(`userId`);

-- CreateIndex
CREATE INDEX `Workout_userId_date_idx` ON `Workout`(`userId`, `date`);

-- RenameIndex
ALTER TABLE `Day` RENAME INDEX `Day_weekId_fkey` TO `Day_weekId_idx`;

-- RenameIndex
ALTER TABLE `JournalEntry` RENAME INDEX `JournalEntry_exerciseId_fkey` TO `JournalEntry_exerciseId_idx`;

-- RenameIndex
ALTER TABLE `JournalEntry` RENAME INDEX `JournalEntry_workoutId_fkey` TO `JournalEntry_workoutId_idx`;

-- RenameIndex
ALTER TABLE `PlannedExercise` RENAME INDEX `PlannedExercise_dayId_fkey` TO `PlannedExercise_dayId_idx`;

-- RenameIndex
ALTER TABLE `PlannedExercise` RENAME INDEX `PlannedExercise_exerciseId_fkey` TO `PlannedExercise_exerciseId_idx`;

-- RenameIndex
ALTER TABLE `Week` RENAME INDEX `Week_programId_fkey` TO `Week_programId_idx`;
