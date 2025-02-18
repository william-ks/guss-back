import { FastifyPluginOptions as FO } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import {
	uploadImageController,
	uploadImageSchema,
} from "./useCases/uploadImage";
import { handleUserAuthToken } from "../../middlewares/handleUserAuthToken";

const imageRouter = async (fastify: FI, options: FO) => {
	fastify.post("/upload", {
		schema: uploadImageSchema,
		preHandler: [handleUserAuthToken],
		handler: (req, res) => {
			return uploadImageController.handle(req, res);
		},
	});
};

export { imageRouter };
