/*
  Warnings:

  - You are about to drop the `medical_wards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `medical_wards`;

-- CreateTable
CREATE TABLE `medicalwards` (
    `id` VARCHAR(191) NOT NULL,
    `medical_wards_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicalrooms` (
    `id` VARCHAR(191) NOT NULL,
    `medical_wards_id` VARCHAR(191) NOT NULL,
    `typeRooms` ENUM('sala', 'quarto', 'salas_de_exame', 'consulta', 'atendimento_geral') NOT NULL,
    `room_name` VARCHAR(191) NOT NULL,
    `quantity_space` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `medicalrooms` ADD CONSTRAINT `medicalrooms_medical_wards_id_fkey` FOREIGN KEY (`medical_wards_id`) REFERENCES `medicalwards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
