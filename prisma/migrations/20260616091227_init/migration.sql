/*
  Warnings:

  - You are about to drop the `_CartItemToPreviousCart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cartId` to the `PreviousCart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_CartItemToPreviousCart` DROP FOREIGN KEY `_CartItemToPreviousCart_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CartItemToPreviousCart` DROP FOREIGN KEY `_CartItemToPreviousCart_B_fkey`;

-- AlterTable
ALTER TABLE `PreviousCart` ADD COLUMN `cartId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_CartItemToPreviousCart`;

-- AddForeignKey
ALTER TABLE `PreviousCart` ADD CONSTRAINT `PreviousCart_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
