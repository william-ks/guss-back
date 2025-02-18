import { s3 } from "./s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

interface IUploadImage {
	path: string;
	buffer: Buffer;
	contentType: string;
}

const uploadImage = async (props: IUploadImage) => {
	const command = new PutObjectCommand({
		Bucket: process.env.BUCKET_NAME,
		Key: props.path,
		Body: props.buffer,
		ContentType: props.contentType,
		ACL: "public-read", // Se desejar que o arquivo seja público
	});

	try {
		await s3.send(command);

		return `https://${process.env.BUCKET_NAME}.s3.${process.env.S3_REGION}.backblazeb2.com/${props.path}`;
	} catch (error) {
		console.error("Erro ao enviar imagem para o S3:", error);
		throw new Error("Erro ao enviar a imagem para o S3");
	}
};

export { uploadImage };
