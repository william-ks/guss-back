import { Router } from "express";
import { handleGestorLogin } from "../../../middlewares/handleGestorLogin";
import { createStudentController } from "./createStudent";

const studentRouter = Router();

studentRouter.post("/login", async (req, res) => {
  return; //
});

studentRouter.post("/create", handleGestorLogin, async (req, res) => {
  return createStudentController.handle(req, res);
});

studentRouter.get("/read/self", handleGestorLogin, async (req, res) => {
  return; //
});

studentRouter.get("/read/other/:id", handleGestorLogin, async (req, res) => {
  return; //
});

studentRouter.get("/read/all", handleGestorLogin, (req, res) => {
  return; //
});

studentRouter.post("/toggleStatus/:id", handleGestorLogin, (req, res) => {
  return; //
});

export { studentRouter };
