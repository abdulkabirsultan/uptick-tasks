import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { processUpload } from '@/lib/upload/imageProcessor';
import { getCachedImage } from '@/lib/redis/cache';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { imageUrl, fileName } = await processUpload(req);

    return NextResponse.json(
      {
        success: true,
        data: { imageUrl, fileName },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const key = url.searchParams.get('key');

    if (!key) {
      return NextResponse.json(
        { error: 'Image key is required' },
        { status: 400 }
      );
    }

    // Try to get image from cache
    const cachedUrl = await getCachedImage(key);

    if (cachedUrl) {
      return NextResponse.json({
        success: true,
        data: { imageUrl: cachedUrl, cached: true },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Image not found in cache' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error getting image:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
