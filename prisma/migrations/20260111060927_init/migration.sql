/*
  Warnings:

  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `PostCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `slug` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `PostCategory` ADD COLUMN `slug` MEDIUMTEXT NOT NULL;
