import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://fe-project-epigram-api.vercel.app/23-kimyumin';
const METHODS_WITH_BODY = ['POST', 'PUT', 'PATCH'];

export async function handleRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    if (!path || !Array.isArray(path)) {
      return NextResponse.json({ error: '잘못된 경로 요청입니다.' }, { status: 400 });
    }

    const subPath = path.join('/');
    const method = request.method;
    const token = request.cookies.get('accessToken')?.value;

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options: RequestInit = { method, headers };

    if (METHODS_WITH_BODY.includes(method)) {
      try {
        const body = await request.json();
        options.body = JSON.stringify(body);
      } catch {
        options.body = JSON.stringify({});
      }
    }

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const finalUrl = `${BACKEND_URL}/${subPath}${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(finalUrl, options);

    const contentType = res.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = { error: text || `서버 오류 발생 (Status: ${res.status})` };
    }

    const response = NextResponse.json(data, { status: res.status });

    const isAuthRoute = subPath === 'auth/signin' || subPath === 'auth/signup';

    if (res.ok && isAuthRoute && data) {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
      };

      if (data.accessToken) {
        response.cookies.set('accessToken', data.accessToken, {
          ...cookieOptions,
          maxAge: 60 * 60 * 24, // 1일
        });
      }

      if (data.refreshToken) {
        response.cookies.set('refreshToken', data.refreshToken, {
          ...cookieOptions,
          maxAge: 60 * 60 * 24 * 7, // 7일
        });
      }
    }

    return response;
  } catch (error) {
    console.error('API 프록시 라우터 에러:', error);
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
