/*
  Warnings:

  - You are about to drop the column `roleId` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_roleId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "roleId";
