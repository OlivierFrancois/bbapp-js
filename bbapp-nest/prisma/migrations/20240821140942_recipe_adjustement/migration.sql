-- DropForeignKey
ALTER TABLE `RecipeItem` DROP FOREIGN KEY `RecipeItem_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeItem` DROP FOREIGN KEY `RecipeItem_dishId_fkey`;

-- AddForeignKey
ALTER TABLE `RecipeItem` ADD CONSTRAINT `RecipeItem_dishId_fkey` FOREIGN KEY (`dishId`) REFERENCES `Dish`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeItem` ADD CONSTRAINT `RecipeItem_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
