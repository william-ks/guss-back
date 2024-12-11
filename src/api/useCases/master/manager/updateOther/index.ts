import { ManagerRepository } from "../../../../repositories/manager/implementation/ManagerRepository";
import { PermissionRepository } from "../../../../repositories/permissions/implementation/PermissionRepository";
import { UpdateSelfManagerService } from "../updateSelf/updateSelfManager.service";
import { UpdateOtherController } from "./updateOther.controller";
import { UpdateOtherService } from "./updateOther.service";

const managerRepository = new ManagerRepository();
const permissionRepository = new PermissionRepository();
const updateManagerService = new UpdateSelfManagerService(managerRepository);

const updateOtherService = new UpdateOtherService(
  managerRepository,
  permissionRepository,
  updateManagerService,
);
const updateOtherController = new UpdateOtherController(updateOtherService);

export { updateOtherController };
