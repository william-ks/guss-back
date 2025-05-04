/*
  Warnings:

  - You are about to drop the column `schedule` on the `classrooms` table. All the data in the column will be lost.
  - Added the required column `schedule_id` to the `classrooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classrooms" DROP COLUMN "schedule",
ADD COLUMN     "schedule_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
