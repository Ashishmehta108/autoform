import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/dashboard") && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup")) &&
    token
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
