/*
  Warnings:

  - Added the required column `paymentAccountMethod` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Partner` ADD COLUMN `paymentAccountMethod` VARCHAR(191) NOT NULL;
