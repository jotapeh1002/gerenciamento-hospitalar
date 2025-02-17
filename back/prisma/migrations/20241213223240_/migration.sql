/*
  Warnings:

  - You are about to drop the column `statusprofessional` on the `duty_schedule` table. All the data in the column will be lost.
  - You are about to drop the column `statusprofessional` on the `procedure` table. All the data in the column will be lost.
  - You are about to drop the column `statusprofessional` on the `professional` table. All the data in the column will be lost.
  - Added the required column `status` to the `duty_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `procedure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `duty_schedule` DROP COLUMN `statusprofessional`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `procedure` DROP COLUMN `statusprofessional`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `professional` DROP COLUMN `statusprofessional`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'ativo';
