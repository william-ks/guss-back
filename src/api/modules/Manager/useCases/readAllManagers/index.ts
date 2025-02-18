import { ManagerRepository } from "../../repository/ManagerRepository";
import { readAllManagersSchema } from "./entities/readAllManagers.schema";
import { ReadAllManagersController } from "./readAllManagers.controller";
import { ReadAllManagersService } from "./readAllManagers.service";

const managerRepository = new ManagerRepository();
const readAllManagersService = new ReadAllManagersService(managerRepository);
const readAllManagersController = new ReadAllManagersController(
	readAllManagersService,
);

export { readAllManagersController, readAllManagersSchema };
