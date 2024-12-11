import { Router } from "express";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
import { createManagerController } from "./useCases/createManager";
import { listAllManagerController } from "./useCases/listAllManager";
import { loginManagerController } from "./useCases/loginManager";
import { readOtherManagerController } from "./useCases/readOtherManager";
import { readSelfManagerController } from "./useCases/readSelfManager";
import { toggleStatusManagerController } from "./useCases/toggleStatusManager";
import { updateSelfManagerController } from "./useCases/updateSelf";
import { handlePermissions } from "../../middlewares/handlePermissions";
import { updateOtherController } from "./useCases/updateOther";

const managerRouter = Router();

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

managerRouter.put("/update/other/:id", handleManagerLogin, async (req, res) => {
  return updateOtherController.handle(req, res);
});

managerRouter.post("/toggleStatus/:id", handleManagerLogin, (req, res) => {
  return toggleStatusManagerController.handle(req, res);
});

export { managerRouter };
