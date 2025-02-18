import { FastifyRequest as FQ, FastifyReply as FR } from "fastify";
import { ManagerRepository } from "../modules/Manager/repository/ManagerRepository";

const handleManagerLogin = async (req: FQ, reply: FR) => {
	const { publicId } = req.user;

	const managerRepository = new ManagerRepository();

	const manager = await managerRepository.findUniqueBy({
		key: "publicId",
		value: publicId,
	});

	if (!manager) {
		throw {
			code: 403,
			message: "Please log in to continue.",
		};
	}

	if (!manager.isActive) {
		throw {
			code: 403,
			message:
				"Your account is inactive. Please contact your administrator",
		};
	}

	req.manager = manager;
};

export { handleManagerLogin };
