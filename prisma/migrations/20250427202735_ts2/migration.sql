/*
  Warnings:

  - Made the column `status` on table `classrooms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "class_students" ADD COLUMN     "absences" INTEGER DEFAULT 0,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "presence" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "classrooms" ALTER COLUMN "status" SET NOT NULL;
