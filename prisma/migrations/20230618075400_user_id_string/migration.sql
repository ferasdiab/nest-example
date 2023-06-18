/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_assineeId_fkey`;

-- AlterTable
ALTER TABLE `Task` MODIFY `assineeId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assineeId_fkey` FOREIGN KEY (`assineeId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
