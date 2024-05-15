import { Router } from "express";
import { userRouter } from "./use-cases/Users/users.routes";

const router = Router();

router.use(userRouter);

export { router };
