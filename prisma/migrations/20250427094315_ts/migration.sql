-- AlterTable
ALTER TABLE "classrooms" ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "managers" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
