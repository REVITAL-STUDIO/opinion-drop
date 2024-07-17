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
  const fileName = `${folder}/${Date.now()}_${file.originalname}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read', 
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; 
  }
};