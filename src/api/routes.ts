import { Router } from "express";
import { masterRouter } from "./useCases/master/master.routes";

const router = Router();

router.use("/master", masterRouter);
router.use("/user", () => {});

export { router };
