-- CreateTable
CREATE TABLE `Day` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `weekId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Day` ADD CONSTRAINT `Day_weekId_fkey` FOREIGN KEY (`weekId`) REFERENCES `Week`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
