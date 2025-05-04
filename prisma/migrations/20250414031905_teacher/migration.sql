-- DropForeignKey
ALTER TABLE "classrooms" DROP CONSTRAINT "classrooms_teacher_id_fkey";

-- AlterTable
ALTER TABLE "classrooms" ALTER COLUMN "teacher_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "classrooms" ADD CONSTRAINT "classrooms_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
