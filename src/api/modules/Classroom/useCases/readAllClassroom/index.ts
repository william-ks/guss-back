import { ClassroomRepository } from "../../repository/ClassroomRepository";
import { ReadAllClassroomController } from "./readAllClassroom.controller";
import { ReadAllClassroomService } from "./readAllClassroom.service";
import { readAllClassroomSchema } from "./entities/readAllClassroom.schema";

const classroomRepository = new ClassroomRepository();
const readAllClassroomService = new ReadAllClassroomService(
	classroomRepository,
);
const readAllClassroomController = new ReadAllClassroomController(
	readAllClassroomService,
);

export { readAllClassroomController, readAllClassroomSchema };
