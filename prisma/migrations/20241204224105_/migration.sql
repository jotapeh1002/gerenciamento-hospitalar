/*
  Warnings:

  - The primary key for the `professional_specialties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `professional_specialties` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `specialtyId` on the `professional_specialties` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `specialties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `specialties` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `professional_specialties` DROP FOREIGN KEY `professional_specialties_specialtyId_fkey`;

-- AlterTable
ALTER TABLE `professional_specialties` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `specialtyId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `specialties` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `professional_specialties` ADD CONSTRAINT `professional_specialties_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `specialties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
