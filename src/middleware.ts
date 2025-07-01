import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    
    // Hanya izinkan admin untuk /dashboard/admin dan /api/admin/*
    if (
      req.nextUrl.pathname.startsWith('/dashboard/admin') ||
      req.nextUrl.pathname.startsWith('/api/admin')
    ) {
      if (role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/admin/:path*', '/api/admin/:path*'],
};
