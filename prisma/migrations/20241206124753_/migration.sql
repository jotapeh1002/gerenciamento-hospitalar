/*
  Warnings:

  - You are about to alter the column `specialtyId` on the `professionalspecialties` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `specialties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `specialties` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `professionalspecialties` DROP FOREIGN KEY `professionalspecialties_specialtyId_fkey`;

-- AlterTable
ALTER TABLE `professionalspecialties` MODIFY `specialtyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `specialties` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `professionalspecialties` ADD CONSTRAINT `professionalspecialties_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `specialties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
