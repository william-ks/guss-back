import { HandlePass } from "../../../../providers/passwords/implementations/HandlePass";
import { ManagerRepository } from "../../../../repositories/manager/implementation/ManagerRepository";
import { PermissionRepository } from "../../../../repositories/permissions/implementation/PermissionRepository";
import { OfficeRepository } from "../../../../repositories/role/implementation/RoleRepository";
import { CreateManagerController } from "./createManager.controller";
import { CreateManagerService } from "./createManager.service";

const handlePass = new HandlePass();
const managerRepository = new ManagerRepository();
const officeRepository = new OfficeRepository();
const permissionRepository = new PermissionRepository();
const createManagerService = new CreateManagerService(
  managerRepository,
  handlePass,
  officeRepository,
  permissionRepository,
);
const createManagerController = new CreateManagerController(
  createManagerService,
);

export { createManagerController };
