/*
  Warnings:

  - You are about to drop the column `presence` on the `class_students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "class_students" DROP COLUMN "presence",
ADD COLUMN     "presences" INTEGER DEFAULT 0;
