import { Router } from "express";
import { handleManagerLogin } from "../../../middlewares/handleManagerLogin";
import { createStudentController } from "./createStudent";

const studentRouter = Router();

studentRouter.post("/login", async (req, res) => {
  return; //
});

studentRouter.post("/create", handleManagerLogin, async (req, res) => {
  return createStudentController.handle(req, res);
});

studentRouter.get("/read/self", handleManagerLogin, async (req, res) => {
  return; //
});

studentRouter.get("/read/other/:id", handleManagerLogin, async (req, res) => {
  return; //
});

studentRouter.get("/read/all", handleManagerLogin, (req, res) => {
  return; //
});

studentRouter.post("/toggleStatus/:id", handleManagerLogin, (req, res) => {
  return; //
});

export { studentRouter };
