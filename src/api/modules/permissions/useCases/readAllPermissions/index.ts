import { PermissionRepository } from "../../repository/implementation/prisma/PermissionRepository";
import { ReadAllPermissionsController } from "./readAllPermissions.controller";
import { ReadAllPermissionService } from "./readAllPermissions.service";

const permissionRepository = new PermissionRepository();
const readAllPermissionService = new ReadAllPermissionService(
  permissionRepository,
);
const readAllPermissionController = new ReadAllPermissionsController(
  readAllPermissionService,
);

export { readAllPermissionController };
