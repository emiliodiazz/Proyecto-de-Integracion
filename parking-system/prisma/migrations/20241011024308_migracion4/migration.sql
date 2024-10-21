/*
  Warnings:

  - You are about to drop the column `rolesId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_rolesId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `rolesId`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rol_Id_fkey` FOREIGN KEY (`rol_Id`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
