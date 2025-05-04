import { FastifyPluginOptions as FO, FastifyRequest as FQ } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import {
	createClassroomController,
	createClassroomSchema,
	TCreateClassroomBody,
} from "./useCases/createClassroom";
import {
	readAllClassroomController,
	readAllClassroomSchema,
} from "./useCases/readAllClassroom";
import {
	readOneClassroomController,
	readOneClassroomSchema,
	TReadOneClassroomParams,
} from "./useCases/readOneClassroom";

const classroomRouter = async (fastify: FI, options: FO) => {
	fastify.post<{ Body: TCreateClassroomBody }>("/create", {
		schema: createClassroomSchema,
		handler: (req, res) => {
			return createClassroomController.handle(req, res);
		},
	});

	// fastify.put<{ Body: TCreateClassroomBody }>("/update", {
	// 	schema: createClassroomSchema,
	// 	handler: (req, res) => {
	// 		return createClassroomController.handle(req, res);
	// 	},
	// });

	fastify.get("/list/all", {
		schema: readAllClassroomSchema,
		handler: (req, res) => {
			return readAllClassroomController.handle(req, res);
		},
	});

	// fastify.get("/findby/teacher/:id", {
	// 	handler: (req, res) => {
	// 		return createClassroomController.handle(req, res);
	// 	},
	// });

	// fastify.get("/findby/student/:id", {
	// 	handler: (req, res) => {
	// 		return createClassroomController.handle(req, res);
	// 	},
	// });

	fastify.get<{ Params: TReadOneClassroomParams }>("/findby/id/:id", {
		schema: readOneClassroomSchema,
		handler: (req, res) => {
			return readOneClassroomController.handle(req, res);
		},
	});
};

export { classroomRouter };
