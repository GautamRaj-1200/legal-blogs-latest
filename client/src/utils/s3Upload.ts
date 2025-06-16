import { instance } from '../api/apiInstance';

interface S3UploadResponse {
  signedUrl: string;
  publicUrl: string;
}

export const uploadToS3 = async (file: File): Promise<string> => {
  try {
    // Get signed URL from backend
    const getSignedUrlResponse = await instance.post<S3UploadResponse>('/api/uploads', {
      fileName: file.name,
      fileType: file.type,
    });

    const { signedUrl, publicUrl } = getSignedUrlResponse.data;

    // Upload file to S3 using signed URL
    const uploadToS3Response = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadToS3Response.ok) {
      throw new Error('Failed to upload file to S3');
    }

    return publicUrl;
  } catch (error) {
    console.error('S3 upload failed:', error);
    throw error;
  }
};
