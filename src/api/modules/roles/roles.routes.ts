import { Router } from "express";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
import { readAllRolesController } from "./useCases/readAllRoles";

const rolesRouter = Router();

rolesRouter.get("/read/all", handleManagerLogin, async (req, res) => {
  return readAllRolesController.handle(req, res);
});

export { rolesRouter };
