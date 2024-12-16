import { Router } from "express";
import { imagesRouter } from "./modules/images/images.routes";
import { managerRouter } from "./modules/managers/manager.routes";
import { permissionRouter } from "./modules/permissions/permissions.routes";
import { rolesRouter } from "./modules/roles/roles.routes";

const router = Router();

router.use("/image", imagesRouter);
router.use("/master/manager", managerRouter);
router.use("/master/role", rolesRouter);
router.use("/master/permission", permissionRouter);

// router.post("/image", handleFile.single("file"), async (req, res) => {
//   console.log(req.file);

//   try {
// const link = await uploadImage({
//   buffer: req.file.buffer,
//   contentType: req.file.mimetype,
//   path: `/upload/user/${idGenerator()}`,
// });

//     return res.send(req.file);
//   } catch (e) {
//     console.log(e);

//     return res.status(400).json({
//       message: "Error",
//     });
//   }
// });

export { router };
