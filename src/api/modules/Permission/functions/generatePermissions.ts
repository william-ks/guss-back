import { FastifyInstance } from "fastify";
import { PermissionsDb } from "../../../shared/PermissionsDb";
import { formatRouteTitle, generateRouteKey } from "./generateRouteKey";
import { PermissionMemoryRepository } from "../repository/memory/PermissionMemoryRepository";

export const generatePermissions = async (fastify: FastifyInstance) => {
	PermissionsDb.length = 0;

	const permissionRepo = new PermissionMemoryRepository();

	for (const [path, routes] of fastify.routes) {
		const route = routes[0];

		if (route.schema && route.schema.needPermission) {
			const routeKey = generateRouteKey({
				path: path,
				method: route.method as string,
			});

			const existingPermission = PermissionsDb.find(
				(permission) => permission.code === routeKey,
			);
			if (existingPermission) {
				return;
			}

			await permissionRepo.save({
				name: formatRouteTitle(path),
				code: routeKey,
				tags: route.schema.tags as string[],
			});
		}
	}

	if (
		process.env.NODE_ENV === "DEVELOPMENT" &&
		process.env.DEBUG === "TRUE"
	) {
		console.log("✅ Permissions generated successfully");
	}
};
