import z from "zod";

const uploadImageSchema = {
	tags: ["Image"],
	summary: "Upload Image",
	description: "Upload Image in format multpart form data request.",
	body: z
		.object({})
		.nullish()
		.describe("Send a multipart formdata with the file"),
	response: {
		200: z.string().describe("Image link"),
	},
};

export { uploadImageSchema };
