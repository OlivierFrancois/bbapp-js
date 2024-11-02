/*
  Warnings:

  - Added the required column `homeId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeId` to the `ArticleCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeId` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeId` to the `DishScheduleItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeId` to the `DishTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeId` to the `RecipeItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `homeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ArticleCategory` ADD COLUMN `homeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Dish` ADD COLUMN `homeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `DishScheduleItem` ADD COLUMN `homeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `DishTag` ADD COLUMN `homeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `RecipeItem` ADD COLUMN `homeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `homeId` INTEGER NULL,
    MODIFY `role` ENUM('ADMIN', 'HOME_LEADER', 'USER') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `Home` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleCategory` ADD CONSTRAINT `ArticleCategory_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DishTag` ADD CONSTRAINT `DishTag_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DishScheduleItem` ADD CONSTRAINT `DishScheduleItem_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeItem` ADD CONSTRAINT `RecipeItem_homeId_fkey` FOREIGN KEY (`homeId`) REFERENCES `Home`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
