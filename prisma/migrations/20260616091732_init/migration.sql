/*
  Warnings:

  - You are about to drop the column `cartId` on the `PreviousCart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `PreviousCart` DROP FOREIGN KEY `PreviousCart_cartId_fkey`;

-- DropIndex
DROP INDEX `PreviousCart_cartId_fkey` ON `PreviousCart`;

-- AlterTable
ALTER TABLE `CartItem` ADD COLUMN `previousCartId` INTEGER NULL;

-- AlterTable
ALTER TABLE `PreviousCart` DROP COLUMN `cartId`;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_previousCartId_fkey` FOREIGN KEY (`previousCartId`) REFERENCES `PreviousCart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
