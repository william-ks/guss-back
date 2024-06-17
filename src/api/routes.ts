import { Router } from "express";
import { gestorRouter } from "./useCases/master/gestors/gestor.routes";

const router = Router();

router.use("/gestor", gestorRouter);
router.use("/teacher", () => {});
router.use("/student", () => {});
router.use("/dev", () => {});

export { router };
