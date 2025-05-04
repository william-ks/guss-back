-- DropForeignKey
ALTER TABLE "classrooms" DROP CONSTRAINT "classrooms_schedule_id_fkey";

-- AlterTable
ALTER TABLE "classrooms" ALTER COLUMN "schedule_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
