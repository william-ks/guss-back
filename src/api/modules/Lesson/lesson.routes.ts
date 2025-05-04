import { FastifyPluginOptions as FO, FastifyRequest as FQ } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import {
	createLessonController,
	createLessonSchema,
	TCreateLessonBody,
} from "./useCases/createLesson";
import {
	deleteLessonController,
	deleteLessonSchema,
	TDeleteLessonParams,
} from "./useCases/deleteLesson";

const lessonRouter = async (fastify: FI, options: FO) => {
	fastify.post<{ Body: TCreateLessonBody }>("/create", {
		schema: createLessonSchema,
		handler: (req, res) => {
			return createLessonController.handle(req, res);
		},
	});

	fastify.delete<{ Params: TDeleteLessonParams }>("/delete/:id", {
		schema: deleteLessonSchema,
		handler: (req, res) => {
			return deleteLessonController.handle(req, res);
		},
	});
};

export { lessonRouter };
