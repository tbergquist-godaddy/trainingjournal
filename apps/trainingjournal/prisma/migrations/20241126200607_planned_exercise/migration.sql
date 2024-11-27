-- CreateTable
CREATE TABLE `PlannedExercise` (
    `id` VARCHAR(191) NOT NULL,
    `exerciseId` VARCHAR(191) NOT NULL,
    `sets` VARCHAR(191) NOT NULL,
    `reps` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `dayId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlannedExercise` ADD CONSTRAINT `PlannedExercise_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlannedExercise` ADD CONSTRAINT `PlannedExercise_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `Day`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
