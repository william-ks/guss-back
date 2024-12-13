import { ReadAllRolesService } from "./readAllRoles.service";
import { ReadAllRolesController } from "./readAllRoles.controller";
import { RoleRepository } from "../../repository/implementation/prisma/RoleRepository";

const rolesService = new RoleRepository();
const readAllRolesService = new ReadAllRolesService(rolesService);
const readAllRolesController = new ReadAllRolesController(readAllRolesService);

export { readAllRolesController };
