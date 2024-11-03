/*
  Warnings:

  - A unique constraint covering the columns `[date,moment,homeId]` on the table `DishScheduleItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `DishScheduleItem_date_moment_key` ON `DishScheduleItem`;

-- CreateIndex
CREATE UNIQUE INDEX `DishScheduleItem_date_moment_homeId_key` ON `DishScheduleItem`(`date`, `moment`, `homeId`);
