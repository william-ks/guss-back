-- CreateTable
CREATE TABLE "offices" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "offices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gestors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthday" TEXT,
    "officeId" TEXT NOT NULL,

    CONSTRAINT "gestors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gestors" ADD CONSTRAINT "gestors_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
