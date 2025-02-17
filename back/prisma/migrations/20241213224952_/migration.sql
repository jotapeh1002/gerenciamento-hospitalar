/*
  Warnings:

  - You are about to drop the column `status` on the `duty_schedule` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `procedure` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `professional` table. All the data in the column will be lost.
  - Added the required column `statusProf` to the `duty_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusProf` to the `procedure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `duty_schedule` DROP COLUMN `status`,
    ADD COLUMN `statusProf` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `procedure` DROP COLUMN `status`,
    ADD COLUMN `statusProf` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `professional` DROP COLUMN `status`,
    ADD COLUMN `statusProf` VARCHAR(191) NOT NULL DEFAULT 'ativo';
