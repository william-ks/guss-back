/*
  Warnings:

  - You are about to drop the column `class_id` on the `ClassStudent` table. All the data in the column will be lost.
  - Added the required column `course_class_id` to the `ClassStudent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClassStudent" DROP CONSTRAINT "ClassStudent_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassStudent" DROP CONSTRAINT "ClassStudent_student_id_fkey";

-- AlterTable
ALTER TABLE "ClassStudent" DROP COLUMN "class_id",
ADD COLUMN     "course_class_id" INTEGER NOT NULL,
ALTER COLUMN "student_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "managers" ADD COLUMN     "color_gray" TEXT,
ADD COLUMN     "color_primary" TEXT;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "color_gray" TEXT,
ADD COLUMN     "color_primary" TEXT;

-- AddForeignKey
ALTER TABLE "ClassStudent" ADD CONSTRAINT "ClassStudent_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudent" ADD CONSTRAINT "ClassStudent_course_class_id_fkey" FOREIGN KEY ("course_class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
