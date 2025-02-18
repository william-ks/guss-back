import z from "zod";

const updateColorsSchema = {
	tags: ["Public"],
	summary: "UpdateColors",
	description: "UpdateColors",
	body: z.object({
		primaryColor: z
			.string({
				message: "Invalid color format.",
			})
			.nullish(),
		grayColor: z
			.string({
				message: "Invalid color format.",
			})
			.nullish(),
		theme: z
			.string({
				message: "Invalid theme format.",
			})
			.refine(
				(data) => {
					if (data === "light" || data === "dark") {
						return true;
					}
					return false;
				},
				{ message: "Invalid theme format." },
			)
			.nullish(),
	}),
	response: {
		204: z.null().describe("Color updated successfully"),
	},
};

type TUpdateColorsBody = z.infer<typeof updateColorsSchema.body>;

export { updateColorsSchema, TUpdateColorsBody };
