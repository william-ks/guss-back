import { IManagerRepository } from "../../../../repositories/manager/IManagerRepository";
import { IPermissionRepository } from "../../../../repositories/permissions/IPermissionRepository";
import { UpdateSelfManagerService } from "../updateSelf/updateSelfManager.service";
import { IUpdateOtherDTO } from "./updateOther.DTO";

export class UpdateOtherService {
  constructor(
    private managerRepository: IManagerRepository,
    private permissionRepository: IPermissionRepository,
    private updateManagerService: UpdateSelfManagerService,
  ) {}

  async verifyPermissions(props: IUpdatePermissions) {
    const {
      actualManagerPermissions,
      permissions,
      managerToUpdatePermissions,
    } = props;

    for (const permission of permissions) {
      const permissionExists = await this.permissionRepository.findById(
        permission.id,
      );

      if (!permissionExists) {
        throw {
          code: 404,
          message: "Permission not found",
        };
      }

      const actualManagerHaveThisPermission = actualManagerPermissions.find(
        (permission) => {
          return permission.id === permission.id;
        },
      );

      if (!actualManagerHaveThisPermission) {
        throw {
          code: 401,
          message: "You don't to update permission that you haven't",
        };
      }

      // const managerToUpdateHaveThisPermission =
      //     managerToUpdatePermissions.find((permission) => {
      //       return permission.id === permission.id;
      //     });

      //   if (!managerToUpdateHaveThisPermission) {
      //     throw {
      //       code: 400,
      //       message: "Manager already have this permission",
      //     };
      //   }

      if (permission.toAdd && !permission.toRemove) {
        const managerToUpdateHaveThisPermission =
          managerToUpdatePermissions.find((permission) => {
            return permission.id === permission.id;
          });

        if (!managerToUpdateHaveThisPermission) {
          throw {
            code: 400,
            message: "Manager already have this permission",
          };
        }
      } else if (permission.toRemove && !permission.toAdd) {
        const managerToUpdateHaveThisPermission =
          managerToUpdatePermissions.find((permission) => {
            return permission.id === permission.id;
          });

        if (managerToUpdateHaveThisPermission) {
          throw {
            code: 400,
            message: "Manager don't have this permission",
          };
        }
      } else {
        throw {
          code: 400,
          message: "Incorrect format to permissions",
        };
      }
    }
  }

  async execute(props: IUpdateOtherDTO) {
    const { actualManager, managerPublicId, ...dataToUpdate } = props;

    const managertoUpdate = await this.managerRepository.findBy({
      key: "public_id",
      value: managerPublicId,
    });

    if (!managertoUpdate) {
      throw {
        code: 404,
        message: "User not found.",
      };
    }

    if (managertoUpdate.public_id === actualManager.public_id) {
      throw {
        code: 401,
        message: "You can't update your own profile here",
      };
    }

    if (props.permissions && props.permissions.length > 0) {
      await this.verifyPermissions({
        actualManagerPermissions: actualManager.permissions,
        permissions: props.permissions,
        managerToUpdatePermissions: managertoUpdate.permissions,
      });
    }

    await this.updateManagerService.execute({
      id: managertoUpdate.id,
      ...dataToUpdate,
    });
  }
}

interface IUpdatePermissions {
  managerToUpdatePermissions: {
    id: number;
    permissionId: number;
    permission?: {
      id?: number;
      name?: string;
      code?: string;
    };
  }[];
  actualManagerPermissions: {
    id: number;
    permissionId: number;
    permission?: {
      id?: number;
      name?: string;
      code?: string;
    };
  }[];
  permissions: {
    id: number;
    toAdd: boolean;
    toRemove: boolean;
  }[];
}
