import { FastifyPluginOptions as FO } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
import { handleUserAuthToken } from "../../middlewares/handleUserAuthToken";
import {
	listAllPermissionsController,
	listAllPermissionsSchema,
} from "./useCases/listAllPermissions";

const permissionRouter = async (fastify: FI, options: FO) => {
	fastify.get("/list", {
		schema: listAllPermissionsSchema,
		preHandler: [handleUserAuthToken, handleManagerLogin],
		handler: (req, res) => {
			return listAllPermissionsController.handle(req, res);
		},
	});
};

export { permissionRouter };
