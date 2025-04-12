import { FastifyPluginOptions as FO } from "fastify";
import { z } from "zod";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
import { handleUserAuthToken } from "../../middlewares/handleUserAuthToken";
import {
	createManagerController,
	createManagerSchema,
	TCreateManagerBody,
} from "./useCases/createManager";
import {
	loginManagerController,
	loginManagerSchema,
} from "./useCases/loginManager";
import {
	readAllManagersController,
	readAllManagersSchema,
} from "./useCases/readAllManagers";
import {
	readOtherManagerController,
	readOtherManagerSchema,
	TReadOtherManagerParams,
} from "./useCases/readOtherManager";
import {
	readSelfManagerController,
	readSelfManagerSchema,
} from "./useCases/readSelfManager";
import {
	toggleManagerStatusController,
	toggleManagerStatusSchema,
	TToggleManagerStatusBody,
	TToggleManagerStatusParams,
} from "./useCases/toggleManagerStatus";
import {
	TUpdateOtherManagerParams,
	updateOtherManagerController,
	updateOtherManagerSchema,
} from "./useCases/updateOtherManager";
import {
	TUpdateSelfManagerBody,
	updateSelfManagerController,
	updateSelfManagerSchema,
} from "./useCases/updateSelfManager";

const managerRouter = async (fastify: FI, options: FO) => {
	fastify.post<{ Body: TCreateManagerBody }>("/create", {
		schema: createManagerSchema,
		// preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return createManagerController.handle(req, res);
		},
	});

	fastify.post<{ Body: TCreateManagerBody }>("/login", {
		schema: loginManagerSchema,
		handler: (req, res) => {
			return loginManagerController.handle(req, res);
		},
	});

	fastify.get("/read/self", {
		schema: readSelfManagerSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, reply) => {
			return readSelfManagerController.handle(req, reply);
		},
	});

	fastify.get<{ Params: TReadOtherManagerParams }>("/read/other/:id", {
		schema: readOtherManagerSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return readOtherManagerController.handle(req, res);
		},
	});

	fastify.get("/read/all", {
		schema: readAllManagersSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return readAllManagersController.handle(req, res);
		},
	});

	fastify.put<{ Body: TUpdateSelfManagerBody }>("/update/self", {
		schema: updateSelfManagerSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return updateSelfManagerController.handle(req, res);
		},
	});

	fastify.put<{
		Body: z.infer<typeof updateOtherManagerSchema.body>;
		Params: TUpdateOtherManagerParams;
	}>("/update/other/:id", {
		schema: updateOtherManagerSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return updateOtherManagerController.handle(req, res);
		},
	});

	fastify.post<{
		Params: TToggleManagerStatusParams;
		Body: TToggleManagerStatusBody;
	}>("/toogle/status/:id", {
		schema: toggleManagerStatusSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return toggleManagerStatusController.handle(req, res);
		},
	});
};

export { managerRouter };
