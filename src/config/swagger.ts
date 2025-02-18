import { jsonSchemaTransform } from "fastify-type-provider-zod";

const swaggerOptions = {
	openapi: {
		info: {
			title: process.env.SWAGGER_APP_NAME as string,
			description: process.env.SWAGGER_APP_DESC as string,
			version: process.env.SWAGGER_APP_VERSION as string,
		},
		host: process.env.SWAGGER_APP_HOST,
		schemes: ["http"],
		consumes: ["application/json"],
		produces: ["application/json"],
	},
	transform: jsonSchemaTransform,
};

const swaggerUiOptions = {
	routePrefix: "/docs",
	exposeRoute: true,
};

export { swaggerOptions, swaggerUiOptions };
