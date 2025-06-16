import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { getSignedUrl as getS3SignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3, S3_BUCKET_NAME } from '../utils/aws.js';

export const getSignedUrl = asyncHandler(async (req: Request, res: Response) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    ApiResponse.error('File name and type are required', 400).send(res);
    return;
  }

  const key = `${Date.now()}-${fileName}`;
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  const signedUrl = await getS3SignedUrl(s3, command, { expiresIn: 3600 });
  const publicUrl = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;

  ApiResponse.success({ signedUrl, publicUrl }, 'Signed URL generated successfully').send(res);
});
