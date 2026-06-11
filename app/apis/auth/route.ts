import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{
    path: string[];
  }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { path } = await params;
    const subPath = path.join('/');

    const body = await request.json();

    const res = await fetch(
      `https://fe-project-epigram-api.vercel.app/23-kimyumin/auth/${subPath}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || '인증 실패' },
        { status: res.status },
      );
    }

    const cookieHeader = res.headers.get('set-cookie');
    const response = NextResponse.json(data);

    if (cookieHeader) {
      response.headers.set('set-cookie', cookieHeader);
    }

    return response;
  } catch (error) {
    console.error('Auth Proxy Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
