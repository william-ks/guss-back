import { FastifyInstance as FI, FastifyPluginOptions as FO } from "fastify";
import { imageRouter } from "./modules/Image/image.routes";
import { lessonRouter } from "./modules/Lesson/lesson.routes";
import { managerRouter } from "./modules/Manager/manager.routes";
import { generatePermissions } from "./modules/Permission/functions/generatePermissions";
import { permissionRouter } from "./modules/Permission/permission.routes";
import { publicRouter } from "./modules/Public/public.routes";
import { roleRouter } from "./modules/Role/role.routes";
import { scheduleRouter } from "./modules/Schedule/schedule.routes";
import { studentRouter } from "./modules/Student/student.routes";

const routesRegister = async (fastify: FI, options: FO) => {
	fastify.register(managerRouter, { prefix: "/manager" });
	fastify.register(studentRouter, { prefix: "/student" });
	fastify.register(roleRouter, { prefix: "/role" });
	fastify.register(publicRouter, { prefix: "/public" });
	fastify.register(imageRouter, { prefix: "/image" });
	fastify.register(permissionRouter, { prefix: "/permission" });
	fastify.register(scheduleRouter, { prefix: "/schedule" });
	fastify.register(lessonRouter, { prefix: "/lesson" });

	fastify.ready(async (RouteOptions) => {
		await generatePermissions(fastify);

		if (
			process.env.NODE_ENV !== "DEVELOPMENT" ||
			process.env.DEBUG !== "TRUE"
		) {
			console.log("✅ Permissions generated successfully");
		}
	});
};

export { routesRegister };
