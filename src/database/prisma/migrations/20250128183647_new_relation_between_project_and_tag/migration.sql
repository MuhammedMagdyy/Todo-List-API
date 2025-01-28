-- AlterTable
ALTER TABLE `projects` ADD COLUMN `tag_uuid` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_tag_uuid_fkey` FOREIGN KEY (`tag_uuid`) REFERENCES `tags`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
