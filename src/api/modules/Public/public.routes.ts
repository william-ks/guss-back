import { FastifyPluginOptions as FO, FastifyRequest as FQ } from "fastify";
import { FastifyTypedInstance as FI } from "../../../@types/FastifyTypeInterface";
import { signOutController, signOutSchema } from "./useCases/signOut";
import {
	TUpdateColorsBody,
	updateColorsController,
	updateColorsSchema,
} from "./useCases/updateColors";
import { handleUserAuthToken } from "../../middlewares/handleUserAuthToken";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
import { aw } from "vitest/dist/chunks/reporters.D7Jzd9GS";
import { handleStudentLogin } from "../../middlewares/handleStudentLogin";

const publicRouter = async (fastify: FI, options: FO) => {
	fastify.get("/signout", {
		schema: signOutSchema,
		handler: (req, res) => {
			return signOutController.handle(req, res);
		},
	});

	fastify.put<{ Body: TUpdateColorsBody }>("/update/color", {
		schema: updateColorsSchema,
		preHandler: [
			handleUserAuthToken,
			async (req, res) => {
				try {
					await handleManagerLogin(req, res);
					await handleStudentLogin(req, res);
				} catch (e) {
					return;
				}
			},
		],
		handler: (req, res) => {
			return updateColorsController.handle(req, res);
		},
	});
};

export { publicRouter };
