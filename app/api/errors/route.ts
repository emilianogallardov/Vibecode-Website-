import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In production, you would:
    // 1. Send to Sentry or similar service
    // 2. Store in a database for analysis
    // 3. Alert the team if it's a critical error

    // For now, just log to console (visible in server logs)
    console.error('[Client Error]', {
      timestamp: body.timestamp,
      message: body.message,
      url: body.url,
      userAgent: body.userAgent,
      stack: body.stack,
    });

    // You could also write to a log file or send to a logging service
    // Example: await sendToLoggingService(body);

    return NextResponse.json(
      { message: 'Error reported successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Error API] Failed to process error report:', error);
    return NextResponse.json(
      { error: 'Failed to process error report' },
      { status: 500 }
    );
  }
}

// Optionally, add a GET endpoint to check error reporting health
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    message: 'Error reporting endpoint is operational',
  });
}