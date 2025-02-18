import { RoleRepository } from "../../repository/RoleRepository";
import { ReadAllRolesController } from "./readAllRoles.controller";
import { ReadAllRolesService } from "./readAllRoles.service";
import { readAllRolesSchema } from "./entities/readAllRoles.schema";

const roleRepository = new RoleRepository();
const readAllRolesService = new ReadAllRolesService(roleRepository);
const readAllRolesController = new ReadAllRolesController(readAllRolesService);

export { readAllRolesController, readAllRolesSchema };
