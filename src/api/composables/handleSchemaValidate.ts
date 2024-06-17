import { ZodSchema } from "zod";

const schemaValidate = async (body: object, zodSchema: ZodSchema) => {
  try {
    await zodSchema.parse(body);
  } catch (error) {
    const issues = error.issues;
    console.log(issues);

    if (issues.lenght === 1) {
      throw {
        code: 400,
        message: issues[0].message,
      };
    } else {
      let messageError = "";

      for (const e of issues) {
        messageError += e.message + "\n";
      }

      throw {
        code: 400,
        message: messageError,
      };
    }
  }
};

export { schemaValidate };
