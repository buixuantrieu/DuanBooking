/*
  Warnings:

  - You are about to drop the column `updatedAd` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAd` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAd` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAd` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAd` on the `RoomType` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `updatedAd`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Partner` DROP COLUMN `updatedAd`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `updatedAd`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Room` DROP COLUMN `updatedAd`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `RoomType` DROP COLUMN `updatedAd`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
