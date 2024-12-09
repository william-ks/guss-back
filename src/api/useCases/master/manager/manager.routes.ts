import { Router } from "express";
import { handleManagerLogin } from "../../../middlewares/handleManagerLogin";
import { createManagerController } from "./createManager";
import { listAllManagerController } from "./listAllManager";
import { loginManagerController } from "./loginManager";
import { readOtherManagerController } from "./readOtherManager";
import { readSelfManagerController } from "./readSelfManager";
import { toggleStatusManagerController } from "./toggleStatusManager";
import { updateSelfManagerController } from "./updateSelf";
import { idGenerator } from "../../../composables/idGenerator";
import { handlePermissions } from "../../../middlewares/handlePermissions";

const managerRouter = Router();

// !remover
managerRouter.get("/id", async (req, res) => {
  const id = idGenerator();

  return res.json(id);
});

managerRouter.post("/login", async (req, res) => {
  return loginManagerController.handle(req, res);
});

managerRouter.post(
  "/create",
  handleManagerLogin,
  handlePermissions("create_managers"),
  async (req, res) => {
    return createManagerController.handle(req, res);
  },
);

managerRouter.get("/read/self", handleManagerLogin, async (req, res) => {
  return readSelfManagerController.handle(req, res);
});

managerRouter.get("/read/other/:id", handleManagerLogin, async (req, res) => {
  return readOtherManagerController.handle(req, res);
});

managerRouter.get("/read/all", handleManagerLogin, (req, res) => {
  return listAllManagerController.handle(req, res);
});

managerRouter.put("/update/self", handleManagerLogin, async (req, res) => {
  return updateSelfManagerController.handle(req, res);
});

managerRouter.post("/toggleStatus/:id", handleManagerLogin, (req, res) => {
  return toggleStatusManagerController.handle(req, res);
});

export { managerRouter };
