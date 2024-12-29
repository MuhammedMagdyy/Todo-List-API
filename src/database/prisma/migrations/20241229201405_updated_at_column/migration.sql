-- AlterTable
ALTER TABLE `projects` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `statuses` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tags` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tasks` ALTER COLUMN `updated_at` DROP DEFAULT;
