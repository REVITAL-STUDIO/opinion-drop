import AWS from 'aws-sdk';
import multer from 'multer';

type MulterFile = Express.Multer.File;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadImage = async (file: MulterFile, folder: string): Promise<string> => {
  console.log("aws access key", process.env.AWS_ACCESS_KEY_ID)
  console.log("aws secret key", process.env.AWS_SECRET_ACCESS_KEY)
  console.log("aws region", process.env.AWS_REGION)
  const fileName = `${folder}/${Date.now()}_${file.originalname}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log("photo cloud url: ", data.Location);
    return data.Location; 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; 
  }
};