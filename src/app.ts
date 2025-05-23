import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import multpart from "@fastify/multipart";
import fastifyRoutes from "@fastify/routes";
import fastifySwagger from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import "dotenv/config";
import { fastify as FastifyMaster } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";
import { FastifyTypedInstance } from "./@types/FastifyTypeInterface";
import { handleErrors } from "./api/middlewares/handleErrors";
import { routesRegister } from "./api/routes";
import { scalarOptions } from "./config/scalar";
import { swaggerOptions } from "./config/swagger";

const fastify: FastifyTypedInstance =
	FastifyMaster().withTypeProvider<ZodTypeProvider>();

fastify.register(fastifyRoutes);

fastify.register(cors, {
	origin: ["http://localhost:3000", "127.0.0.1"],
	credentials: true,
});

fastify.setErrorHandler(handleErrors);

fastify.register(multpart, {
	limits: { fileSize: 10 * 1024 * 1024 },
});

fastify.register(fastifyCookie);
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

if (process.env.NODE_ENV === "DEVELOPMENT") {
	fastify.register(fastifySwagger, swaggerOptions);
	fastify.register(ScalarApiReference, scalarOptions);
}

fastify.register(routesRegister, { prefix: "/api" });

export { fastify };
