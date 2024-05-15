import { Router } from "express";
import { createUserController } from "./createUser";
import { loginUserController } from "./loginUser";
import { handleLogin } from "../../middlewares/HandleLogin";
import { HandlePermission } from "../../middlewares/HandlePermission";

const userRouter = Router();

userRouter.post(
  "/user/create",
  HandlePermission("create_other_users"),
  (req, res) => {
    return createUserController.handle(req, res);
  },
);

userRouter.post("/user/login", (req, res) => {
  return loginUserController.handle(req, res);
});

userRouter.use(handleLogin.use);

userRouter.post("/user/read/self", (req, res) => {
  return; // Login user
});

userRouter.post(
  "/user/read/other/:id",
  HandlePermission("read_another_users"),
  (req, res) => {
    return; // Login user
  },
);

userRouter.put("/user/update/self", (req, res) => {
  return; // Login user
});

userRouter.put("/user/update/other/:id", (req, res) => {
  return; // Login user
});

export { userRouter };
