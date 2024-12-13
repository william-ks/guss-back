import { ManagerRepository } from "../../repository/implementation/prisma/ManagerRepository";
import { ReadOtherManagerService } from "./readOther.Service";
import { ReadOtherManagerController } from "./readOther.controller";

const managerRepository = new ManagerRepository();
const readOtherManagerService = new ReadOtherManagerService(managerRepository);
const readOtherManagerController = new ReadOtherManagerController(
  readOtherManagerService,
);

export { readOtherManagerController };
