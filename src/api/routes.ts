import { Router } from "express";
import { managerRouter } from "./modules/managers/manager.routes";
import { rolesRouter } from "./modules/roles/roles.routes";

const router = Router();

router.use("/master/manager", managerRouter);
router.use("/master/role", rolesRouter);

export { router };
