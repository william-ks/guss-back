/*
  Warnings:

  - You are about to drop the column `is_active` on the `class_students` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `classrooms` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `homeworks` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `managers` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "class_students" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "classrooms" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "homeworks" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "managers" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "is_active";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "is_active";
