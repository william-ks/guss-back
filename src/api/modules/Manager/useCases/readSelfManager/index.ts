import { ManagerRepository } from "../../repository/ManagerRepository";
import { ReadSelfManagerController } from "./readSelfManager.controller";
import { ReadSelfManagerService } from "./readSelfManager.service";
import { readSelfManagerSchema } from "./entities/readSelfManager.schema";

const managerRepository = new ManagerRepository();
const readSelfManagerService = new ReadSelfManagerService(managerRepository);
const readSelfManagerController = new ReadSelfManagerController(
	readSelfManagerService,
);

export { readSelfManagerController, readSelfManagerSchema };
