import { createClient } from 'redis';

// Initialize Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// Connect to Redis only when needed
async function getRedisClient() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
}

// Cache image URL by key
export async function cacheImage(
  key: string,
  imageUrl: string,
  expiryInSeconds = 3600
): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.set(`image:${key}`, imageUrl, { EX: expiryInSeconds });
  } catch (error) {
    console.error('Redis cache error:', error);
    // Fail gracefully if Redis is unavailable
  }
}

// Get cached image URL
export async function getCachedImage(key: string): Promise<string | null> {
  try {
    const client = await getRedisClient();
    return await client.get(`image:${key}`);
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
}

// Delete cached image
export async function deleteCachedImage(key: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del(`image:${key}`);
  } catch (error) {
    console.error('Redis delete error:', error);
    // Fail gracefully if Redis is unavailable
  }
}

// Cache task data
export async function cacheTask(
  taskId: string,
  taskData: any,
  expiryInSeconds = 3600
): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.set(`task:${taskId}`, JSON.stringify(taskData), {
      EX: expiryInSeconds,
    });
  } catch (error) {
    console.error('Redis cache error:', error);
    // Fail gracefully if Redis is unavailable
  }
}

// Get cached task data
export async function getCachedTask(taskId: string): Promise<any | null> {
  try {
    const client = await getRedisClient();
    const data = await client.get(`task:${taskId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
}

// Delete cached task data
export async function deleteCachedTask(taskId: string): Promise<void> {
  try {
    const client = await getRedisClient();
    await client.del(`task:${taskId}`);
  } catch (error) {
    console.error('Redis delete error:', error);
    // Fail gracefully if Redis is unavailable
  }
}
