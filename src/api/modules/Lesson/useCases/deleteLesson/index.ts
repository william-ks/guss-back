import { LessonRepository } from "../../repository/LessonRepository";
import { DeleteLessonController } from "./deleteLesson.controller";
import { DeleteLessonService } from "./deleteLesson.service";
import {
	deleteLessonSchema,
	TDeleteLessonParams,
} from "./entities/deleteLesson.schema";

const lessonRepository = new LessonRepository();
const deleteLessonService = new DeleteLessonService(lessonRepository);
const deleteLessonController = new DeleteLessonController(deleteLessonService);

export { deleteLessonController, deleteLessonSchema, TDeleteLessonParams };
