/*
  Warnings:

  - The values [CANCELLED] on the enum `tasks_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `status` ENUM('IN_PROGRESS', 'DONE', 'ARCHIVED') NOT NULL DEFAULT 'IN_PROGRESS';

-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `status` ENUM('IN_PROGRESS', 'DONE', 'ARCHIVED') NOT NULL DEFAULT 'IN_PROGRESS';
