import getSession from "@/shared/config/session";
import { NextRequest, NextResponse } from "next/server";

interface Routes {
  [key: string]: boolean;
}

const publicPaths: Routes = {
  "/": true,
  "/signup": true,
  "/login": true,
  "/sms": true,
};

export async function middleware(request: NextRequest) {
  // get session.id to cookie
  const session = await getSession();
  const pathName = request.nextUrl.pathname;
  // get pathName
  const isPublicPath =
    publicPaths[pathName] ||
    pathName.startsWith("/github") ||
    pathName.startsWith("/naver") ||
    pathName.startsWith("/kakao") ||
    pathName.startsWith("/sms") ||
    pathName.startsWith("/google");
  if (!session.id) {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // return NextResponse.next();
  } else {
    if (isPublicPath) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
  // how to set cookie
  // const response = NextResponse.next();
  // response.cookies.set("middleware-cookie", "hello, i'm cookie");
  return;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
