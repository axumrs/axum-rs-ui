import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  let token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME);
  //   console.log("--- middleware ---", token);
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    // Add ?from=/incoming-url to the /login URL
    loginUrl.searchParams.set("r", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/user/:path*",
};
