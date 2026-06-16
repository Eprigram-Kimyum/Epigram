import { NextRequest, NextResponse } from 'next/server';

async function handleRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const subPath = path.join('/');
  const method = request.method;

  const token = request.cookies.get('accessToken')?.value;

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(await request.json().catch(() => ({})));
  }

  const BACKEND_URL = 'https://fe-project-epigram-api.vercel.app/23-kimyumin';

  const url = subPath.startsWith('auth')
    ? `${BACKEND_URL}/${subPath}`
    : `${BACKEND_URL}/${subPath}`;

  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const finalUrl = `${url}${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(finalUrl, options);

  const data = await res.json().catch(() => ({}));
  const response = NextResponse.json(data, { status: res.status });

  if ((subPath.includes('signin') || subPath.includes('signup')) && data.accessToken) {
    response.cookies.set('accessToken', data.accessToken, {});
  }

  return response;
}

export const GET = handleRequest;
export const POST = handleRequest;
