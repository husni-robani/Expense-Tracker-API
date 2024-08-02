-- DropForeignKey
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
