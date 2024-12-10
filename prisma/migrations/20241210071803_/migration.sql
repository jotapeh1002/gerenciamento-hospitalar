/*
  Warnings:

  - Added the required column `nivel` to the `manager` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel` to the `professional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel` to the `receptionist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `manager` ADD COLUMN `nivel` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `professional` ADD COLUMN `nivel` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `receptionist` ADD COLUMN `nivel` INTEGER NOT NULL;
