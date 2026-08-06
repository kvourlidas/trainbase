import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";

const protectedRoutes = ["/account"];
const publicOnlyRoutes = ["/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (publicOnlyRoutes.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static image extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
