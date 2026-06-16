-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- DropIndex
DROP INDEX `CartItem_cartId_fkey` ON `CartItem`;

-- AlterTable
ALTER TABLE `CartItem` MODIFY `cartId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
