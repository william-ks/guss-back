import { schemaValidate } from "../../../../composables/handleSchemaValidate";
import { idGenerator } from "../../../../composables/idGenerator";
import { IHandlePass } from "../../../../providers/passwords/IHandlePass";
import { IPermissionRepository } from "../../../permissions/repository/IPermissionRepository";
import { IRoleRepository } from "../../../roles/repository/IRoleRepository";
import { IManagerRepository } from "../../repository/IManagerRepository";
import { ICreateManagerDTO } from "./createManager.DTO";
import { createManagerSchema } from "./createManager.schema";

export class CreateManagerService {
  constructor(
    private readonly managerRepository: IManagerRepository,
    private readonly handlePass: IHandlePass,
    private readonly roleRepository: IRoleRepository,
    private readonly permissionRepository: IPermissionRepository,
  ) {}

  async execute(props: ICreateManagerDTO) {
    await schemaValidate(props, createManagerSchema);
    const { actualManager, permissions, ...newManager } = props;

    const emailAlreadyExists = await this.managerRepository.findBy({
      key: "email",
      value: props.email,
    });

    if (emailAlreadyExists) {
      throw {
        code: 400,
        message: "Este e-mail já existe.",
      };
    }

    const cpfAlreadyExists = await this.managerRepository.findBy({
      key: "cpf",
      value: props.cpf,
    });

    if (cpfAlreadyExists) {
      throw {
        code: 400,
        message: "Este cpf já existe.",
      };
    }

    const roleFound = await this.roleRepository.find(props.roleId);

    if (!roleFound) {
      throw {
        code: 404,
        message: "Este cargo não existe.",
      };
    }

    if (permissions.length >= 1) {
      for (const permissionId of props.permissions) {
        const found = await this.permissionRepository.findById(permissionId);

        const foundIntoActualManager = actualManager.permissions.find((el) => {
          return el.permissionId === permissionId;
        });

        if (!found) {
          throw {
            code: 404,
            message: `Permission code not found ${permissionId}`,
          };
        }

        if (!foundIntoActualManager) {
          throw {
            code: 401,
            message: `Not authorized, because you don't have this permission code ${found.id}`,
          };
        }
      }
    }

    const password = this.handlePass.generatePass(12);
    const publicId = idGenerator();
    const photo =
      newManager.photo ||
      "https://i.pinimg.com/736x/cd/3b/f5/cd3bf5ec0480195ac95ee4b17da01b0a.jpg";

    await this.managerRepository.save({
      ...newManager,
      publicId,
      permissions,
      photo,
      password: await this.handlePass.encrypt(password),
    });

    return password;
  }
}
