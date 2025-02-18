import { uploadImageSchema } from "./entities/uploadImage.schema";
import { UploadImageController } from "./uploadImage.controller";

const uploadImageController = new UploadImageController();

export { uploadImageController, uploadImageSchema };
