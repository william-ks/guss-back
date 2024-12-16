export interface IUploadPhotoDTO {
  user: {
    publicId: string;
    type: "manager" | "student";
  };
  file: {
    mimetype: string;
    buffer: Buffer;
    size: number;
    encoding?: string;
    fieldName?: string;
    originalName?: string;
  };
}
