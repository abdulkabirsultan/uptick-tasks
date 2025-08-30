import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string;

export async function uploadToS3(
  file: Buffer,
  contentType: string,
  filename: string
): Promise<string> {
  // Generate a unique key for the file
  const key = `task-images/${uuidv4()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
    // Set cache control for CloudFront CDN
    CacheControl: 'max-age=31536000', // Cache for 1 year
  });

  await s3Client.send(command);

  // Return the CloudFront URL of the uploaded file
  return `${process.env.CLOUDFRONT_DOMAIN}/${key}`;
}

export async function getSignedS3Url(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  // URL expires in 1 hour
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
}

// Function to extract S3 key from CloudFront URL
export function getKeyFromUrl(url: string): string {
  if (!url) return '';
  const domain = process.env.CLOUDFRONT_DOMAIN;
  if (!domain || !url.includes(domain)) return '';

  return url.replace(`${domain}/`, '');
}
