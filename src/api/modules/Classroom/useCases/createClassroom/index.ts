import { ClassroomRepository } from "../../repository/ClassroomRepository";
import { CreateClassroomController } from "./createClassroom.controller";
import { CreateClassroomService } from "./createClassroom.service";
import { createClassroomSchema, TCreateClassroomBody } from "./entities/createClassroom.schema";

const classroomRepository = new ClassroomRepository();
const createClassroomService = new CreateClassroomService(classroomRepository);
const createClassroomController = new CreateClassroomController(createClassroomService);

export { createClassroomController, createClassroomSchema, TCreateClassroomBody };