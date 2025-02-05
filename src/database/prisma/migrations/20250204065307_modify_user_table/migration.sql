/*
  Warnings:

  - You are about to alter the column `provider` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `users_provider_id_key` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `refresh_token` TEXT NULL,
    MODIFY `provider` ENUM('LOCAL', 'GOOGLE', 'GITHUB') NOT NULL DEFAULT 'LOCAL',
    MODIFY `provider_id` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- CreateIndex
CREATE INDEX `users_provider_provider_id_idx` ON `users`(`provider`, `provider_id`);
