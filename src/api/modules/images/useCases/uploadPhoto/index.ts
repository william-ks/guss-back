import { UploadPhotoController } from "./uploadPhoto.controller";
import { UploadPhotoService } from "./uploadPhoto.service";

const uploadPhotoService = new UploadPhotoService();
const uploadPhotoController = new UploadPhotoController(uploadPhotoService);

export { uploadPhotoController };
