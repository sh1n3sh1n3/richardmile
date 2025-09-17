import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Testing Collections API integration...');

    // Test 1: Check if collections endpoint is working
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 4000}`;

    const collectionsResponse = await fetch(`${baseUrl}/api/collections`);
    const collectionsResult = await collectionsResponse.json();

    console.log('Collections API Response:', {
      status: collectionsResponse.status,
      success: collectionsResult.success,
      count: collectionsResult.count,
      hasData: Array.isArray(collectionsResult.data) && collectionsResult.data.length > 0,
    });

    // Test 2: Check if seed endpoint works (if collections are empty)
    let seedResult = null;
    if (!collectionsResult.success || collectionsResult.count === 0) {
      console.log('No collections found, testing seed endpoint...');

      const seedResponse = await fetch(`${baseUrl}/api/collections/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      seedResult = await seedResponse.json();
      console.log('Seed API Response:', {
        status: seedResponse.status,
        success: seedResult.success,
        count: seedResult.count,
      });
    }

    // Test 3: Test category filtering
    const categoryResponse = await fetch(`${baseUrl}/api/collections?category=Tourbillon`);
    const categoryResult = await categoryResponse.json();

    console.log('Category Filter Test:', {
      status: categoryResponse.status,
      success: categoryResult.success,
      count: categoryResult.count,
      filtered: categoryResult.data?.every((item: any) => item.category === 'Tourbillon'),
    });

    return res.status(200).json({
      success: true,
      message: 'Collections API integration test completed',
      results: {
        collectionsApi: {
          status: collectionsResponse.status,
          success: collectionsResult.success,
          count: collectionsResult.count,
          hasData: Array.isArray(collectionsResult.data) && collectionsResult.data.length > 0,
        },
        seedApi: seedResult
          ? {
              status: 200,
              success: seedResult.success,
              count: seedResult.count,
            }
          : null,
        categoryFilter: {
          status: categoryResponse.status,
          success: categoryResult.success,
          count: categoryResult.count,
          filtered: categoryResult.data?.every((item: any) => item.category === 'Tourbillon'),
        },
      },
      baseUrl,
    });
  } catch (error) {
    console.error('Collections API test failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Collections API integration test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
