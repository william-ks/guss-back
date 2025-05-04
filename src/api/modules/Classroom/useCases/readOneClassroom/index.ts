import { ClassroomRepository } from "../../repository/ClassroomRepository";
import { ReadOneClassroomController } from "./readOneClassroom.controller";
import { ReadOneClassroomService } from "./readOneClassroom.service";
import {
	readOneClassroomSchema,
	TReadOneClassroomParams,
} from "./entities/readOneClassroom.schema";

const classroomRepository = new ClassroomRepository();
const readOneClassroomService = new ReadOneClassroomService(
	classroomRepository,
);
const readOneClassroomController = new ReadOneClassroomController(
	readOneClassroomService,
);

export {
	readOneClassroomController,
	readOneClassroomSchema,
	TReadOneClassroomParams,
};
