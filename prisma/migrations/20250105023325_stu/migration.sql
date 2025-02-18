/*
  Warnings:

  - You are about to drop the column `class_time` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `students` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_role_id_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "class_time",
DROP COLUMN "role_id",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "roleId" INTEGER;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
