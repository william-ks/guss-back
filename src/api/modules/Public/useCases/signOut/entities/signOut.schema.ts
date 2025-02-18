import z from "zod";

const signOutSchema = {
	tags: ["Manager", "Student"],
	summary: "Logout",
	description: "Logout",
	response: {
		204: z.null().describe("Success"),
	},
};

export { signOutSchema };
