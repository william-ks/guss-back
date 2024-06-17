import { GestorRepository } from "../../../../repositories/gestor/implementation/GestorRepository";
import { ListAllGestorsController } from "./listAllGestors.controller";
import { ListAllGestorsService } from "./listAllGestors.service";

const gestorRepository = new GestorRepository();
const listAllGestorsService = new ListAllGestorsService(gestorRepository);
const listAllGestorsController = new ListAllGestorsController(
  listAllGestorsService,
);

export { listAllGestorsController };
