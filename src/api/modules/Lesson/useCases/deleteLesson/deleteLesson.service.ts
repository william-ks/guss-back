import { IDeleteLessonDTO } from "./entities/deleteLesson.DTO";
import { ILessonRepository } from "../../repository/ILessonRepository";

class DeleteLessonService {
	constructor(private lessonRepository: ILessonRepository) {}

	async execute(props: IDeleteLessonDTO) {}
}

export { DeleteLessonService };
