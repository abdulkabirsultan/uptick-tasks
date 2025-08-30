import formidable from 'formidable';
import { NextRequest } from 'next/server';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { uploadToS3 } from '../aws/s3';
import { cacheImage } from '../redis/cache';

// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function processUpload(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Get the file from the form data
    const file = formData.get('image') as File | null;

    if (!file) {
      throw new Error('No file uploaded');
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(
        'File type not supported. Please upload a JPEG, PNG, WebP or GIF'
      );
    }

    // Generate a unique filename
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${uuidv4()}.${fileExt}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Optimize image if it's not a GIF
    let optimizedBuffer = buffer as unknown as Buffer;
    let contentType = file.type;

    if (file.type !== 'image/gif') {
      // Resize and optimize the image
      optimizedBuffer = await sharp(buffer)
        .resize(1200, 1200, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 80 }) // Convert to WebP for better compression
        .toBuffer();

      contentType = 'image/webp';
    }

    // Upload to S3
    const imageUrl = await uploadToS3(optimizedBuffer, contentType, fileName);

    // Cache the image URL in Redis
    await cacheImage(fileName, imageUrl, 60 * 60 * 24 * 7); // Cache for 7 days

    return { imageUrl, fileName };
  } catch (error: any) {
    console.error('Upload processing error:', error);
    throw new Error(error.message || 'Error processing upload');
  }
}
