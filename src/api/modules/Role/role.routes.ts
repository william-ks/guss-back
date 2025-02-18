import { FastifyPluginOptions as FO, FastifyRequest as FQ } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
import { handleUserAuthToken } from "../../middlewares/handleUserAuthToken";
import {
	createRoleController,
	createRoleSchema,
	TCreateRoleBody,
} from "./useCases/createRole";
import {
	readAllRolesController,
	readAllRolesSchema,
} from "./useCases/readAllRoles";

const roleRouter = async (fastify: FI, options: FO) => {
	fastify.post("/create", {
		schema: createRoleSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return createRoleController.handle(
				req as FQ<{ Body: TCreateRoleBody }>,
				res,
			);
		},
	});

	fastify.get("/read/all", {
		schema: readAllRolesSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return readAllRolesController.handle(req, res);
		},
	});
};

export { roleRouter };
