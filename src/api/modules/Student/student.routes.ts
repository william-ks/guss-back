import { FastifyPluginOptions as FO } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
import { handleStudentLogin } from "../../middlewares/handleStudentLogin";
import { handleUserAuthToken } from "../../middlewares/handleUserAuthToken";
import { TToggleManagerStatusBody } from "../Manager/useCases/toggleManagerStatus";
import {
	createStudentController,
	createStudentSchema,
	TCreateStudentBody,
} from "./useCases/createStudent";
import {
	loginStudentController,
	loginStudentSchema,
} from "./useCases/loginStudent";
import {
	readAllStudentsController,
	readAllStudentsSchema,
} from "./useCases/readAllStudents";
import {
	readOneStudentController,
	readOneStudentSchema,
	TReadOneStudentParams,
} from "./useCases/readOneStudent";
import {
	readSelfStudentController,
	readSelfStudentSchema,
} from "./useCases/readSelfStudent";
import {
	toggleStudentStatusController,
	toggleStudentStatusSchema,
	TToggleStudentStatusParams,
} from "./useCases/toggleStudentStatus";
import {
	TUpdateSelfStudentBody,
	updateSelfStudentController,
	updateSelfStudentSchema,
} from "./useCases/updateSelfStudent";

const studentRouter = async (fastify: FI, options: FO) => {
	fastify.post<{ Body: TCreateStudentBody }>("/create", {
		schema: createStudentSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return createStudentController.handle(req, res);
		},
	});

	fastify.post<{ Body: TCreateStudentBody }>("/login", {
		schema: loginStudentSchema,
		handler: (req, res) => {
			return loginStudentController.handle(req, res);
		},
	});

	fastify.get("/read/self", {
		schema: readSelfStudentSchema,
		preHandler: [handleUserAuthToken, handleStudentLogin],
		handler: (req, res) => {
			return readSelfStudentController.handle(req, res);
		},
	});

	fastify.get("/read/all", {
		schema: readAllStudentsSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return readAllStudentsController.handle(req, res);
		},
	});

	fastify.get<{ Params: TReadOneStudentParams }>("/read/one/:id", {
		schema: readOneStudentSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return readOneStudentController.handle(req, res);
		},
	});

	fastify.put<{ Body: TUpdateSelfStudentBody }>("/update/self", {
		schema: updateSelfStudentSchema,
		preHandler: [handleUserAuthToken, handleStudentLogin],
		handler: (req, res) => {
			return updateSelfStudentController.handle(req, res);
		},
	});

	fastify.put<{
		Body: TToggleManagerStatusBody;
		Params: TToggleStudentStatusParams;
	}>("/toggle/status/:id", {
		schema: toggleStudentStatusSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return toggleStudentStatusController.handle(req, res);
		},
	});
};

export { studentRouter };
