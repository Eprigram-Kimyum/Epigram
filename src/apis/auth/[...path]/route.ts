import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{
    path: string[];
  }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { path } = await params;

    if (!path || !Array.isArray(path)) {
      return NextResponse.json({ error: '잘못된 경로 요청입니다.' }, { status: 400 });
    }

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

    if (!res.ok) {
      const contentType = res.headers.get('content-type');
      let errorMessage = '인증 실패';

      if (contentType && contentType.includes('application/json')) {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const errorText = await res.text();
        errorMessage = errorText || `서버 오류가 발생했습니다. (Status: ${res.status})`;
      }

      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    const data = await res.json();
    const response = NextResponse.json(data);

    const cookieHeaders = res.headers.getSetCookie();
    if (cookieHeaders.length > 0) {
      cookieHeaders.forEach((cookie) => {
        response.headers.append('set-cookie', cookie);
      });
    }

    return response;
  } catch (error) {
    console.error('Auth Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
