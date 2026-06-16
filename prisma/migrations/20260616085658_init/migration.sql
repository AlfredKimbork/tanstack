/*
  Warnings:

  - You are about to drop the column `prevUserId` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_prevUserId_fkey`;

-- DropIndex
DROP INDEX `Cart_prevUserId_fkey` ON `Cart`;

-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `prevUserId`;

-- CreateTable
CREATE TABLE `PreviousCart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CartItemToPreviousCart` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CartItemToPreviousCart_AB_unique`(`A`, `B`),
    INDEX `_CartItemToPreviousCart_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PreviousCart` ADD CONSTRAINT `PreviousCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartItemToPreviousCart` ADD CONSTRAINT `_CartItemToPreviousCart_A_fkey` FOREIGN KEY (`A`) REFERENCES `CartItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CartItemToPreviousCart` ADD CONSTRAINT `_CartItemToPreviousCart_B_fkey` FOREIGN KEY (`B`) REFERENCES `PreviousCart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
