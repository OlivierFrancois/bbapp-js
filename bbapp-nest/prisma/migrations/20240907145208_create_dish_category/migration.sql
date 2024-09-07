-- AlterTable
ALTER TABLE `Dish` ADD COLUMN `dishCategoryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `DishCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_dishCategoryId_fkey` FOREIGN KEY (`dishCategoryId`) REFERENCES `DishCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
