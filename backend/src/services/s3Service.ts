import { CreateBucketCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET_NAME!;
const region = process.env.AWS_REGION!;
const s3_endpoint = process.env.S3_ENDPOINT!;
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID!;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;

const s3 = new S3Client({
  region: region,
  endpoint: s3_endpoint,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
  },
  forcePathStyle: true,
});

export const createBucket = async () => {
  await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
  console.log(`Bucket '${bucketName}' criado com sucesso!`);
};

export const uploadImage = async (file: Express.Multer.File, nameOrigin: boolean = false) => {
  const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
  const uploadParams = {
    Bucket: bucketName,
    Key: nameOrigin ? file.originalname : fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  await s3.send(new PutObjectCommand(uploadParams));

  return `${s3_endpoint}/${bucketName}/${fileName}`;
};
