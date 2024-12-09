import { Router } from "express";
import { managerRouter } from "./manager/manager.routes";
import { studentRouter } from "./students/student.routes";

const masterRouter = Router();

masterRouter.use("/manager", managerRouter);
masterRouter.use("/student", studentRouter);

export { masterRouter };
