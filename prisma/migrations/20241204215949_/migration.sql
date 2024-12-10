-- CreateTable
CREATE TABLE `manager` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `manager_rg_key`(`rg`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receptionist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `receptionist_rg_key`(`rg`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professional` (
    `id` VARCHAR(191) NOT NULL,
    `professional_name` VARCHAR(191) NOT NULL,
    `typeProfessional` ENUM('medico', 'enfermeiro') NOT NULL,
    `rg` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `professional_rg_key`(`rg`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professional_specialties` (
    `id` VARCHAR(191) NOT NULL,
    `professionalId` VARCHAR(191) NOT NULL,
    `specialtyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `specialties` (
    `id` VARCHAR(191) NOT NULL,
    `name_specialty` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `duty_schedule` (
    `id` VARCHAR(191) NOT NULL,
    `date_start` DATETIME(3) NOT NULL,
    `date_finish` DATETIME(3) NOT NULL,
    `shift` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `observation` VARCHAR(191) NOT NULL,
    `professional_name_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `patient_rg_key`(`rg`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedure` (
    `id` VARCHAR(191) NOT NULL,
    `professional_name_id` VARCHAR(191) NOT NULL,
    `patient_name_id` VARCHAR(191) NOT NULL,
    `typeConsultation` ENUM('consulta', 'exame', 'operacao') NOT NULL,
    `date_initial` DATETIME(3) NOT NULL,
    `hour_start` DATETIME(3) NOT NULL,
    `hour_finish` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `observation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `insumos` (
    `id` VARCHAR(191) NOT NULL,
    `insumos_name` VARCHAR(191) NOT NULL,
    `insumos_description` VARCHAR(191) NOT NULL,
    `insumos_quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_wards` (
    `id` VARCHAR(191) NOT NULL,
    `medical_wards_name` VARCHAR(191) NOT NULL,
    `typeRooms` ENUM('sala', 'quarto', 'salas_de_exame', 'consulta', 'atendimento_geral') NOT NULL,
    `room_name` VARCHAR(191) NOT NULL,
    `quantity_space` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `professional_specialties` ADD CONSTRAINT `professional_specialties_professionalId_fkey` FOREIGN KEY (`professionalId`) REFERENCES `professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professional_specialties` ADD CONSTRAINT `professional_specialties_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `specialties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `duty_schedule` ADD CONSTRAINT `duty_schedule_professional_name_id_fkey` FOREIGN KEY (`professional_name_id`) REFERENCES `professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedure` ADD CONSTRAINT `procedure_professional_name_id_fkey` FOREIGN KEY (`professional_name_id`) REFERENCES `professional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedure` ADD CONSTRAINT `procedure_patient_name_id_fkey` FOREIGN KEY (`patient_name_id`) REFERENCES `patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
