import { fastify } from "./app";

fastify.listen({ port: Number(process.env.PORT) }, () => {
	if (process.env.NODE_ENV === "DEVELOPMENT") {
		console.log(
			"\x1b[36m%s\x1b[0m",
			`😎 [server]: is running on http://localhost:${process.env.PORT}`,
		);
	}
});
