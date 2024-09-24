-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `image` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `roomName` TEXT NOT NULL,
    `description` LONGTEXT NOT NULL,
    `location` TEXT NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `pricePerNight` DOUBLE NOT NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAd` DATETIME(3) NOT NULL,
    `roomTypeId` INTEGER NOT NULL,
    `partnerId` VARCHAR(191) NOT NULL,
    `provinceId` INTEGER NOT NULL,
    `districtId` INTEGER NOT NULL,
    `wardId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_provinceId_fkey` FOREIGN KEY (`provinceId`) REFERENCES `province`(`province_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `district`(`district_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_wardId_fkey` FOREIGN KEY (`wardId`) REFERENCES `wards`(`wards_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
