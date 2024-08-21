-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Article` MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
