import { Router } from "express";
import { createStudentController } from "./useCases/createStudent";

const studentRouter = Router();

studentRouter.post("/login", async (req, res) => {
  return; //
});

studentRouter.post("/create", async (req, res) => {
  return createStudentController.handle(req, res);
});

studentRouter.get("/read/self", async (req, res) => {
  return; //
});

studentRouter.get("/read/other/:id", async (req, res) => {
  return; //
});

studentRouter.get("/read/all", (req, res) => {
  return; //
});

studentRouter.post("/toggleStatus/:id", (req, res) => {
  return; //
});

export { studentRouter };
