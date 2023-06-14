-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('New', 'Progress', 'Complete') NOT NULL,
    `assineeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assineeId_fkey` FOREIGN KEY (`assineeId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
