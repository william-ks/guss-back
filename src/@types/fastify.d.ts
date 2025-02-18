/* eslint-disable @typescript-eslint/no-explicit-any */
import "fastify";
import "fastify-cookie";
import { Manager } from "../api/modules/Manager/model/Manager";
import { Student } from "../api/modules/Student/model/Student";

declare module "fastify" {
	interface FastifyRequest {
		user?: {
			publicId: string;
		};
		manager?: Partial<Manager>;
		student?: Partial<Student>;
		cookies: { [key: string]: string };
	}

	interface FastifyReply {
		cookie(name: string, value: string, options?: any): void;
	}

	interface FastifySchema {
		needPermission?: boolean;
	}
}
