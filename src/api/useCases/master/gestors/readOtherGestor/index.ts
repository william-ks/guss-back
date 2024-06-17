import { GestorRepository } from "../../../../repositories/gestor/implementation/GestorRepository";
import { ReadOtherGestorService } from "./readOther.Service";
import { ReadOtherGestorController } from "./readOther.controller";

const gestorRepository = new GestorRepository();
const readOtherGestorService = new ReadOtherGestorService(gestorRepository);
const readOtherGestorController = new ReadOtherGestorController(
  readOtherGestorService,
);

export { readOtherGestorController };
