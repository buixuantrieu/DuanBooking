/*
  Warnings:

  - Added the required column `updatedAd` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAd` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAd` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAd` DATETIME(3) NOT NULL;
