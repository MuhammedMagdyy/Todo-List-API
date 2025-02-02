-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_project_uuid_fkey`;

-- DropIndex
DROP INDEX `tasks_project_uuid_fkey` ON `tasks`;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_project_uuid_fkey` FOREIGN KEY (`project_uuid`) REFERENCES `projects`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
