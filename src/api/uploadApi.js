import { API_BASE_URL, apiRequest } from './client';

/**
 * Upload a file directly to AWS S3 using a Presigned URL (No Multer / No server disk buffering)
 * @param {File} file - The file object from <input type="file" />
 * @param {string} folder - Destination folder on S3 ('resumes', 'images', 'candidate-profile')
 * @returns {Promise<{ publicUrl: string, previewUrl: string, key: string, fileName: string }>}
 */
export const uploadFileToS3 = async (file, folder = 'resumes') => {
  if (!file) throw new Error('No file provided for upload');

  try {
    // 1. Request Presigned PUT URL from Backend
    const presignedData = await apiRequest('/upload/generate-presigned-url', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type || 'application/octet-stream',
        folder,
      }),
    });

    if (!presignedData || !presignedData.presignedUrl) {
      throw new Error(presignedData?.message || 'Failed to acquire S3 upload credentials');
    }

    const { presignedUrl, publicUrl, previewUrl, key } = presignedData;

    // If running in development without real AWS credentials, fallback gracefully
    if (presignedUrl.includes('mock=true')) {
      console.log('[S3 Upload] Simulated direct S3 upload for local development.');
      return {
        publicUrl,
        previewUrl,
        key,
        fileName: file.name,
      };
    }

    // 2. Direct HTTP PUT upload from Browser to Amazon S3
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Direct S3 upload failed with status: ${uploadResponse.status}`);
    }

    return {
      publicUrl,
      previewUrl,
      key,
      fileName: file.name,
    };
  } catch (err) {
    console.error('[UploadApi] Error during direct S3 upload:', err);
    throw err;
  }
};
