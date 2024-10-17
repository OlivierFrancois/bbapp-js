/*
  Warnings:

  - A unique constraint covering the columns `[date,moment]` on the table `DishScheduleItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DishScheduleItem_date_moment_key` ON `DishScheduleItem`(`date`, `moment`);
