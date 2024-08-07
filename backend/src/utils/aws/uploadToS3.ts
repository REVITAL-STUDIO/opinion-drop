import AWS from 'aws-sdk';
import multer from 'multer';
import { Readable } from 'stream';

type MulterFile = Express.Multer.File;

AWS.config.update({
  accessKeyId: process.env.OPINIONDROP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.OPINIONDROP_AWS_SECRET_ACCESS_KEY,
  region: process.env.OPINIONDROP_AWS_REGION,
});

const s3 = new AWS.S3();

export const uploadImage = async (fileOrSvg: MulterFile | string, folder: string): Promise<string> => {
  console.log("aws access key", process.env.OPINIONDROP_AWS_ACCESS_KEY_ID)
  console.log("aws secret key", process.env.OPINIONDROP_AWS_SECRET_ACCESS_KEY)
  console.log("aws region", process.env.OPINIONDROP_AWS_REGION)
  let fileName = '';
  let body: any;
  let mimeType: any;

  if (typeof fileOrSvg === 'string') {
    // Handle SVG string
    body = Readable.from([fileOrSvg]);
    mimeType = 'image/svg+xml';
    fileName = `${folder}/${Date.now()}_${fileOrSvg}`;
  } else {
    // Handle MulterFile
    body = fileOrSvg.buffer;
    mimeType = fileOrSvg.mimetype;
    fileName = `${folder}/${Date.now()}_${fileOrSvg.originalname}`;
  }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: fileName,
      Body: body,
      ContentType: mimeType,
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