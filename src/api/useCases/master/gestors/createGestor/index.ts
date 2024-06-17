import { HandlePass } from "../../../../providers/passwords/implementations/HandlePass";
import { GestorRepository } from "../../../../repositories/gestor/implementation/GestorRepository";
import { OfficeRepository } from "../../../../repositories/office/implementation/OfficeRepository";
import { CreateGestorController } from "./createGestor.controller";
import { CreateGestorService } from "./createGestor.service";

const handlePass = new HandlePass();
const gestorRepository = new GestorRepository();
const officeRepository = new OfficeRepository();
const createGestorService = new CreateGestorService(
  gestorRepository,
  handlePass,
  officeRepository,
);
const createGestorController = new CreateGestorController(createGestorService);

export { createGestorController };
// ? Missing Testes
