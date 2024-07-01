import { Router } from "express";
import { gestorRouter } from "./gestors/gestor.routes";
import { studentRouter } from "./students/student.routes";

const masterRouter = Router();

masterRouter.use("/gestor", gestorRouter);
masterRouter.use("/teacher", () => {});
masterRouter.use("/student", studentRouter);
masterRouter.use("/dev", () => {});

export { masterRouter };
