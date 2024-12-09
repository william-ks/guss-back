import { ManagerRepository } from "../../../../repositories/manager/implementation/ManagerRepository";
import { ReadSelfManagerController } from "./readSelfManager.controller";
import { ReadSelfManagerService } from "./readSelfManager.service";

const managerRepository = new ManagerRepository();
const readSelfService = new ReadSelfManagerService(managerRepository);
const readSelfManagerController = new ReadSelfManagerController(
  readSelfService,
);

export { readSelfManagerController };
