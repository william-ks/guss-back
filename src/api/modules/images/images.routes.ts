import { Router } from "express";
import { uploadPhotoController } from "./useCases/uploadPhoto";
import { handleFile } from "../../providers/images/multer";
import { allowEitherMiddleware } from "../../composables/allowEitherMiddleware";
import { handleStudentLogin } from "../../middlewares/HandleStudentLogin";
import { handleManagerLogin } from "../../middlewares/handleManagerLogin";
const requireLogin = allowEitherMiddleware(
  handleManagerLogin,
  handleStudentLogin,
);

const imagesRouter = Router();

imagesRouter.post(
  "/upload",
  requireLogin,
  handleFile.single("file"),
  async (req, res) => {
    return uploadPhotoController.handle(req, res);
  },
);

export { imagesRouter };
