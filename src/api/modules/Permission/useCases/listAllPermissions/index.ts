import { PermissionMemoryRepository } from "../../repository/memory/PermissionMemoryRepository";
import { listAllPermissionsSchema } from "./entities/listAllPermissions.schema";
import { ListAllPermissionsController } from "./listAllPermissions.controller";

const permissionRepository = new PermissionMemoryRepository();
const listAllPermissionsController = new ListAllPermissionsController(
	permissionRepository,
);

export { listAllPermissionsController, listAllPermissionsSchema };
