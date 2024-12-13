import { Router } from "express";
import { managerRouter } from "./modules/managers/manager.routes";
import { rolesRouter } from "./modules/roles/roles.routes";
import { permissionRouter } from "./modules/permissions/permissions.routes";

const router = Router();

router.use("/master/manager", managerRouter);
router.use("/master/role", rolesRouter);
router.use("/master/permission", permissionRouter);

export { router };
