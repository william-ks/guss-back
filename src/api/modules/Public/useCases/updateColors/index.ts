import { UpdateColorsController } from "./updateColors.controller";
import { UpdateColorsService } from "./updateColors.service";
import {
	updateColorsSchema,
	TUpdateColorsBody,
} from "./entities/updateColors.schema";
import { ManagerRepository } from "../../../Manager/repository/ManagerRepository";
import { StudentRepository } from "../../../Student/repository/StudentRepository";

const managerRepository = new ManagerRepository();
const studentRepository = new StudentRepository();

const updateColorsService = new UpdateColorsService(
	managerRepository,
	studentRepository,
);
const updateColorsController = new UpdateColorsController(updateColorsService);

export { updateColorsController, updateColorsSchema, TUpdateColorsBody };
