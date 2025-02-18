import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

const handleErrors = (
	error: FastifyError,
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log("\x1b[41m%s\x1b[0m", error);

	if (error.validationContext === "body") {
		const [cause, ...msg] = error.message.split(" ");
		return reply.code(400).send({
			message: msg.join(" "),
		});
	}
	return reply.code(Number(error.code) || 500).send({
		message: error.message || "Internal Server Error",
	});
};

export { handleErrors };
