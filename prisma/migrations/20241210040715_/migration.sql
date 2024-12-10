-- DropForeignKey
ALTER TABLE `medicalrooms` DROP FOREIGN KEY `medicalrooms_medical_wards_id_fkey`;

-- AlterTable
ALTER TABLE `medicalrooms` MODIFY `medical_wards_id` VARCHAR(191) NULL,
    MODIFY `typeRooms` ENUM('sala', 'quarto', 'salas_de_exame', 'consulta', 'atendimento_geral') NULL,
    MODIFY `room_name` VARCHAR(191) NULL,
    MODIFY `quantity_space` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `medicalrooms` ADD CONSTRAINT `medicalrooms_medical_wards_id_fkey` FOREIGN KEY (`medical_wards_id`) REFERENCES `medicalwards`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
