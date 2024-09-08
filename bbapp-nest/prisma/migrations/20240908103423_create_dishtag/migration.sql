/*
  Warnings:

  - You are about to drop the column `dishCategoryId` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the `DishCategory` table. If the table is not empty, all the data it contains will be lost.

*/
UPDATE `Dish` SET `dishCategoryId`=null WHERE 1;

-- DropForeignKey
ALTER TABLE `Dish` DROP FOREIGN KEY `Dish_dishCategoryId_fkey`;

-- AlterTable
ALTER TABLE `Dish` DROP COLUMN `dishCategoryId`;

-- DropTable
DROP TABLE `DishCategory`;

-- CreateTable
CREATE TABLE `DishTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DishToDishTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DishToDishTag_AB_unique`(`A`, `B`),
    INDEX `_DishToDishTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_DishToDishTag` ADD CONSTRAINT `_DishToDishTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Dish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DishToDishTag` ADD CONSTRAINT `_DishToDishTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `DishTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
