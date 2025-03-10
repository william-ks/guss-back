/*
  Warnings:

  - You are about to drop the column `end_at` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `lessons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "end_at",
DROP COLUMN "start_at";
