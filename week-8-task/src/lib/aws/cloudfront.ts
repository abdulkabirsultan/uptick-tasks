import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';

// Initialize CloudFront client
const cloudFrontClient = new CloudFrontClient({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID as string;

/**
 * Invalidate CloudFront cache for a specific path
 * @param paths Array of paths to invalidate, e.g. ['/task-images/image1.jpg']
 */
export async function invalidateCloudFrontCache(
  paths: string[]
): Promise<void> {
  // Ensure paths start with /
  const formattedPaths = paths.map((path) =>
    path.startsWith('/') ? path : `/${path}`
  );

  const command = new CreateInvalidationCommand({
    DistributionId: DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: Date.now().toString(), // Unique reference for the invalidation
      Paths: {
        Quantity: formattedPaths.length,
        Items: formattedPaths,
      },
    },
  });

  await cloudFrontClient.send(command);
}
