-- DropForeignKey
ALTER TABLE `Week` DROP FOREIGN KEY `Week_programId_fkey`;

-- AddForeignKey
ALTER TABLE `Week` ADD CONSTRAINT `Week_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
