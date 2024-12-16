import { idGenerator } from "../../../../composables/idGenerator";
import { uploadImage } from "../../../../providers/images/backblaze";
import { IUploadPhotoDTO } from "./uploadPhoto.DTO";

export class UploadPhotoService {
  async execute(props: IUploadPhotoDTO) {
    const { file } = props;

    if (!file) {
      throw {
        code: 400,
        message: "File is required",
      };
    }

    const acceptedMymetypes = ["png", "jpg", "jpeg"];

    const foundMymeType = acceptedMymetypes.find((el) => {
      return el === file.mimetype.split("/")[1];
    });

    if (!foundMymeType) {
      throw {
        code: 400,
        message: "File type is not accepted",
      };
    }

    const link = await uploadImage({
      buffer: file.buffer,
      contentType: file.mimetype,
      path: `/upload/${props.user.type}/${props.user.publicId}/${idGenerator()}`,
    });

    return link;
  }
}
