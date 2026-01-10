/*
  Warnings:

  - You are about to alter the column `name` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `first_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `last_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `name` VARCHAR(10) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `Comments` MODIFY `comment` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `image` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `first_name` VARCHAR(10) NOT NULL,
    MODIFY `last_name` VARCHAR(10) NULL,
    MODIFY `image` VARCHAR(255) NULL,
    MODIFY `bio` MEDIUMTEXT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;
