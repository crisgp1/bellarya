export { auth as middleware } from '@/auth';

export const config = {
  // Match all paths except static files and api routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
