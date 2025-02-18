import { LessonRepository } from "../../repository/LessonRepository";
import { CreateLessonController } from "./createLesson.controller";
import { CreateLessonService } from "./createLesson.service";
import { createLessonSchema, TCreateLessonBody } from "./entities/createLesson.schema";

const lessonRepository = new LessonRepository();
const createLessonService = new CreateLessonService(lessonRepository);
const createLessonController = new CreateLessonController(createLessonService);

export { createLessonController, createLessonSchema, TCreateLessonBody };