/*
  Warnings:

  - You are about to drop the column `status` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[status_uuid]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status_uuid]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status_uuid` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_uuid` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `status`,
    ADD COLUMN `status_uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `status`,
    ADD COLUMN `status_uuid` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `statuses` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `projects_status_uuid_key` ON `projects`(`status_uuid`);

-- CreateIndex
CREATE UNIQUE INDEX `tasks_status_uuid_key` ON `tasks`(`status_uuid`);

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_status_uuid_fkey` FOREIGN KEY (`status_uuid`) REFERENCES `statuses`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_status_uuid_fkey` FOREIGN KEY (`status_uuid`) REFERENCES `statuses`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
