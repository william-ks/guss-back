import { FastifyRequest as FQ, FastifyReply as FY } from "fastify";
import { uploadImage } from "../../../../providers/images/backblaze";
import { nanoid } from "nanoid";

class UploadImageController {
	constructor() {}

	async handle(req: FQ, reply: FY) {
		const file = await req.file();
		const id = req.user.publicId;

		const link = await uploadImage({
			buffer: await file.toBuffer(),
			contentType: file.mimetype,
			path: `upload/${id}/${nanoid()}`,
		});

		return reply.send(link);
	}
}

export { UploadImageController };
