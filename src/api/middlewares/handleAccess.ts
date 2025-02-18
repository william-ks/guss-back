import { FastifyReply as FR, FastifyRequest as FQ } from "fastify";
import { generateRouteKey } from "../modules/Permission/functions/generateRouteKey";

const handleAccess = (req: FQ, reply: FR, next: Function) => {
	const routeKey = generateRouteKey({
		method: req.method,
		path: req.url,
	});

	const havePermission = req.manager.permissions.find(
		(p: string) => p === routeKey,
	);

	if (!havePermission) {
		throw {
			code: 403,
			message: "Access denied",
		};
	}

	next();
};

export { handleAccess };
