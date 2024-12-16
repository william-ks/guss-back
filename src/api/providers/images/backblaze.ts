import { s3 } from "./s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const uploadImage = async (props: IUploadImage) => {
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: props.path,
    Body: props.buffer,
    ContentType: props.contentType,
  });

  await s3.send(command);

  return `https://${process.env.BUCKET_NAME}.s3.${process.env.S3_REGION}.backblazeb2.com/${props.path}`;
};

interface IUploadImage {
  path: string;
  buffer: Buffer;
  contentType: string;
}

export { uploadImage };
