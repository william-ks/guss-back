import { ClassroomRepository } from "../../repository/ClassroomRepository";
import { MovimentStudentsController } from "./movimentStudents.controller";
import { MovimentStudentsService } from "./movimentStudents.service";
import {
	movimentStudentsSchema,
	TMovimentStudentsBody,
} from "./entities/movimentStudents.schema";

const classroomRepository = new ClassroomRepository();
const movimentStudentsService = new MovimentStudentsService(
	classroomRepository,
);
const movimentStudentsController = new MovimentStudentsController(
	movimentStudentsService,
);

export {
	movimentStudentsController,
	movimentStudentsSchema,
	TMovimentStudentsBody,
};
