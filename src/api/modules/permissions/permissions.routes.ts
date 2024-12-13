import { Router } from "express";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
import { readAllPermissionController } from "./useCases/readAllPermissions";

const permissionRouter = Router();

permissionRouter.get("/read/all", handleManagerLogin, async (req, res) => {
  return readAllPermissionController.handle(req, res);
});

export { permissionRouter };
