/*
  Warnings:

  - A unique constraint covering the columns `[dishId,articleId]` on the table `RecipeItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RecipeItem_dishId_articleId_key` ON `RecipeItem`(`dishId`, `articleId`);
