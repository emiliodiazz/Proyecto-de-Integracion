-- DropIndex
DROP INDEX `Ubicacion_usuario_Id_key` ON `ubicacion`;

-- AlterTable
ALTER TABLE `user` MODIFY `rut` VARCHAR(191) NULL;
