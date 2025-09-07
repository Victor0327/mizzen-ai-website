import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory cache with TTL
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    // Check cache first
    const cacheKey = `dataset_${id}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log(`Cache hit for ${id}`)
      return NextResponse.json(cached.data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Cache-Control': 'public, max-age=300', // 5 minutes browser cache
        },
      })
    }
    
    console.log(`Cache miss for ${id}, fetching from TOS...`)
    
    // Convert data_X to temp_X for TOS URL
    const tempId = id.replace('data_', 'temp_')
    const url = `https://ml-datasets.tos-cn-shanghai.volces.com/datasets/datasets_gui_gt_5min/datas/${tempId}/data.json`
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(30000), // 30 seconds timeout
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch dataset' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Cache the result
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    })
    
    // Clean up expired cache entries periodically
    if (cache.size > 100) { // Limit cache size
      for (const [key, value] of cache.entries()) {
        if (Date.now() - value.timestamp >= CACHE_TTL) {
          cache.delete(key)
        }
      }
    }
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, max-age=300', // 5 minutes browser cache
      },
    })
  } catch (error) {
    console.error('Error fetching dataset:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}