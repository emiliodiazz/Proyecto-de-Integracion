/*
  Warnings:

  - You are about to drop the column `users_Id` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[rut]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rol_Id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rut` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ubicacion` DROP FOREIGN KEY `Ubicacion_usuario_Id_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_rol_Id_fkey`;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `users_Id`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `rol_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `rut` VARCHAR(191) NOT NULL,
    ADD COLUMN `ubicacionId` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `usuarios`;

-- CreateIndex
CREATE UNIQUE INDEX `User_rut_key` ON `User`(`rut`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rol_Id_fkey` FOREIGN KEY (`rol_Id`) REFERENCES `Roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ubicacionId_fkey` FOREIGN KEY (`ubicacionId`) REFERENCES `Ubicacion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
