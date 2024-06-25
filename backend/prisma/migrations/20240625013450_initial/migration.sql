/*
  Warnings:

  - You are about to drop the column `date` on the `task` table. All the data in the column will be lost.
  - Added the required column `expirateDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `date`,
    ADD COLUMN `expirateDate` DATETIME(3) NOT NULL;
