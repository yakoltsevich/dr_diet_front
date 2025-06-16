import { NextResponse } from 'next/server';
import { PUBLIC_ROUTES } from '@/shared/constants';

export function middleware(request) {
  const token = request.cookies.get('refresh_token');
  const pathname = request.nextUrl.pathname;

  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/meals/:path*', '/ingredients/:path*'],
};
