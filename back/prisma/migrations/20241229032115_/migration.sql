/*
  Warnings:

  - You are about to drop the column `date_initial` on the `procedure` table. All the data in the column will be lost.
  - You are about to drop the column `hour_finish` on the `procedure` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `procedure` table. All the data in the column will be lost.
  - You are about to drop the column `statusProf` on the `procedure` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `procedure` DROP COLUMN `date_initial`,
    DROP COLUMN `hour_finish`,
    DROP COLUMN `observation`,
    DROP COLUMN `statusProf`;
