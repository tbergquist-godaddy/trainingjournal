-- DropForeignKey
ALTER TABLE `Workout` DROP FOREIGN KEY `Workout_dayId_fkey`;

-- AlterTable
ALTER TABLE `Workout` MODIFY `dayId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `Day`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
