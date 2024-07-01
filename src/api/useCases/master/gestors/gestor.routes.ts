import { Router } from "express";
import { handleGestorLogin } from "../../../middlewares/handleGestorLogin";
import { createGestorController } from "./createGestor";
import { listAllGestorsController } from "./listAllGestors";
import { loginGestorController } from "./loginGestor";
import { readOtherGestorController } from "./readOtherGestor";
import { readSelfGestorController } from "./readSelfGestor";
import { toggleStatusGestorController } from "./toggleStatusGestor";
import { updateSelfGestorController } from "./updateSelf";

const gestorRouter = Router();

gestorRouter.post("/login", async (req, res) => {
  return loginGestorController.handle(req, res);
});

gestorRouter.post("/create", handleGestorLogin, async (req, res) => {
  return createGestorController.handle(req, res);
});

gestorRouter.get("/read/self", handleGestorLogin, async (req, res) => {
  return readSelfGestorController.handle(req, res);
});

gestorRouter.get("/read/other/:id", handleGestorLogin, async (req, res) => {
  return readOtherGestorController.handle(req, res);
});

gestorRouter.get("/read/all", handleGestorLogin, (req, res) => {
  return listAllGestorsController.handle(req, res);
});

gestorRouter.put("/update/self", handleGestorLogin, async (req, res) => {
  return updateSelfGestorController.handle(req, res);
});

gestorRouter.post("/toggleStatus/:id", handleGestorLogin, (req, res) => {
  return toggleStatusGestorController.handle(req, res);
});

export { gestorRouter };
