import { FastifyPluginOptions as FO, FastifyRequest as FQ } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import {
	createLessonController,
	createLessonSchema,
	TCreateLessonBody,
} from "./useCases/createLesson";

const lessonRouter = async (fastify: FI, options: FO) => {
	fastify.post<{ Body: TCreateLessonBody }>("/create", {
		schema: createLessonSchema,
		handler: (req, res) => {
			return createLessonController.handle(req, res);
		},
	});
};

export { lessonRouter };
