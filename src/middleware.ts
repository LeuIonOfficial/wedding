import { NextRequest, NextResponse } from 'next/server';

const supportedLocales = ['en', 'ru', 'ro'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  // Check if the pathname starts with a locale
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (supportedLocales.includes(firstSegment)) {
    return firstSegment;
  }

  // If no locale in the pathname, try to get it from the accept-language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => {
        const shortLang = lang.substring(0, 2);
        return supportedLocales.includes(shortLang);
      });
    
    if (preferredLocale) {
      return preferredLocale.substring(0, 2);
    }
  }

  // Default to English if no locale is found
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // If the request is for the favicon or other static files, bypass
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images/')
  ) {
    return NextResponse.next();
  }

  // Check if the request already has a supported locale
  const segments = pathname.split('/');
  const firstSegment = segments[1];
  
  if (supportedLocales.includes(firstSegment)) {
    return NextResponse.next();
  }
  
  // If no locale is present, redirect to the appropriate locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};