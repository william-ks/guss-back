import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const prisma = new PrismaClient({});

const createPermissions = async () => {
  try {
    const permissions = await prisma.permission.findMany();

    const defaultPermissions = [
      {
        name: "Read Others Managers",
        code: "read_other_manager",
      },
      {
        name: "Create Managers",
        code: "create_managers",
      },
    ];

    if (permissions.length <= 0) {
      for (const defaultPermission of defaultPermissions) {
        await prisma.permission.create({
          data: {
            name: defaultPermission.name,
            code: defaultPermission.code,
          },
        });
      }
    }
  } catch (e) {
    throw "error createPermissions";
  }
};

const createRoles = async () => {
  try {
    const roles = await prisma.role.findMany();

    const defaultOffices = ["Developer", "Boss", "Admin", "Manager", "Teacher"];

    if (roles.length <= 0) {
      for (const defaultOffice of defaultOffices) {
        await prisma.role.create({
          data: {
            title: defaultOffice,
          },
        });
      }
    }
  } catch (e) {
    throw "error createRoles";
  }
};

const createDefaultDev = async () => {
  try {
    const devs = await prisma.manager.findMany({
      where: {
        roleId: 1,
      },
    });

    if (devs.length <= 0) {
      const hash = await bcrypt.hash(
        process.env.DEV_DEFAULT_PASS as string,
        10,
      );

      await prisma.$transaction(async (prisma) => {
        const manager = await prisma.manager.create({
          data: {
            publicId: nanoid(),
            name: "Dev 01",
            email: process.env.DEV_DEFAULT_EMAIL as string,
            password: hash,
            cpf: "000.000.000-00",
            roleId: 1,
          },
        });

        const permissions = await prisma.permission.findMany();

        for (const permission of permissions) {
          await prisma.managerPermission.create({
            data: {
              managerId: manager.id,
              permissionId: permission.id,
            },
          });
        }
      });
    }
  } catch (e) {
    throw "error createDefaultDev";
  }
};

const main = async () => {
  try {
    await createPermissions();
    await createRoles();
    await createDefaultDev();
  } catch (e) {
    throw "error main";
  }
};

main();
