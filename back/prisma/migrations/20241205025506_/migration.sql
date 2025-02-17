/*
  Warnings:

  - The primary key for the `specialties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `professional_specialties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `professional_specialties` DROP FOREIGN KEY `professional_specialties_professionalId_fkey`;

-- DropForeignKey
ALTER TABLE `professional_specialties` DROP FOREIGN KEY `professional_specialties_specialtyId_fkey`;

-- AlterTable
ALTER TABLE `specialties` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `professional_specialties`;

-- CreateTable
CREATE TABLE `professionalspecialties` (
    `id` VARCHAR(191) NOT NULL,
    `professionalId` VARCHAR(191) NOT NULL,
    `specialtyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `professionalspecialties` ADD CONSTRAINT `professionalspecialties_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professionalspecialties` ADD CONSTRAINT `professionalspecialties_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `specialties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
