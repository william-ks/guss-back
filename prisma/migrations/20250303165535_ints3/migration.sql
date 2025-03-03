/*
  Warnings:

  - You are about to drop the column `schedule_id` on the `homeworks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "homeworks" DROP CONSTRAINT "homeworks_schedule_id_fkey";

-- AlterTable
ALTER TABLE "homeworks" DROP COLUMN "schedule_id";
