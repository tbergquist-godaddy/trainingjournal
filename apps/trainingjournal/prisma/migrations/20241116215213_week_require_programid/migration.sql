/*
  Warnings:

  - Made the column `programId` on table `Week` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Week` DROP FOREIGN KEY `Week_programId_fkey`;

-- AlterTable
ALTER TABLE `Week` MODIFY `programId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Week` ADD CONSTRAINT `Week_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
