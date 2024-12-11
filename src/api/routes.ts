import { Router } from "express";
import { managerRouter } from "./modules/managers/manager.routes";

const router = Router();

router.use("/master/manager", managerRouter);

export { router };
