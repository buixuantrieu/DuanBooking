/*
  Warnings:

  - You are about to drop the column `UserId` on the `UserRole` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserRole` DROP FOREIGN KEY `UserRole_UserId_fkey`;

-- AlterTable
ALTER TABLE `UserRole` DROP COLUMN `UserId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
