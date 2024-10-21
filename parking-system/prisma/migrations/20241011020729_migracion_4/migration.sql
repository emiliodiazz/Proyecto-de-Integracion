-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_rol_Id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `rolesId` VARCHAR(191) NULL,
    MODIFY `rol_Id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rolesId_fkey` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
