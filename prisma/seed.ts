import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const main = async () => {
  try {
    const offices = await prisma.office.findMany();

    if (offices.length <= 0) {
      await prisma.office.createMany({
        data: [
          {
            title: "Desenvolvedor",
          },
          {
            title: "Proprietário",
          },
          {
            title: "Admin",
          },
          {
            title: "Gestor",
          },
          {
            title: "Professor",
          },
        ],
      });
    }
  } catch (e) {
    return "error";
  }
};

main();
