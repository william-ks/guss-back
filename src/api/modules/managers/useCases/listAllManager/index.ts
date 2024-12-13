import { ManagerRepository } from "../../repository/implementation/prisma/ManagerRepository";
import { ListAllManagerController } from "./listAllManagers.controller";
import { ListAllManagerService } from "./listAllManagers.service";

const managerRepository = new ManagerRepository();
const listAllManagerService = new ListAllManagerService(managerRepository);
const listAllManagerController = new ListAllManagerController(
  listAllManagerService,
);

export { listAllManagerController };
