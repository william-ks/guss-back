import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
	region: process.env.S3_REGION,
	endpoint: process.env.S3_ENDPOINT, // Endpoint da Backblaze
	credentials: {
		accessKeyId: process.env.BUCKET_KEYID, // keyID
		secretAccessKey: process.env.BUCKET_ACCESSKEY, // applicationKey
	},
	forcePathStyle: true, // Necessário para compatibilidade com Backblaze
});

export { s3 };
