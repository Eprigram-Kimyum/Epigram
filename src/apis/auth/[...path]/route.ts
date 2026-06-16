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

    if ((subPath === 'signIn' || subPath === 'signUp') && data.accessToken && data.refreshToken) {
      response.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1일
      });

      response.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7일
      });
    }

    if (subPath === 'refresh-token' && data.accessToken) {
      response.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1일
      });
    }

    return response;
  } catch (error) {
    console.error('인증 라우트 핸들러 에러:', error);
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}
