import { ICreateLessonDTO } from "./entities/createLesson.DTO";
import { ILessonRepository } from "../../repository/ILessonRepository";

class CreateLessonService {
	constructor(private lessonRepository: ILessonRepository) {}

	async execute(props: ICreateLessonDTO) {}
}

export { CreateLessonService };
