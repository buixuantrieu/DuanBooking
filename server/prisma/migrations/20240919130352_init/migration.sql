/*
  Warnings:

  - You are about to drop the column `statusUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `StatusUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_statusUserId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `statusUserId`,
    ADD COLUMN `status` INTEGER NOT NULL;

-- DropTable
DROP TABLE `StatusUser`;
