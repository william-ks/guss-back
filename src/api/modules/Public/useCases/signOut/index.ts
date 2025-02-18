import { signOutSchema } from "./entities/signOut.schema";
import { SignOutController } from "./signOut.controller";

const signOutController = new SignOutController();

export { signOutController, signOutSchema };
