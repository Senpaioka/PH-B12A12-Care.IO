import { NextResponse } from 'next/server'
 
export async function proxy(req) {

    // getting user ip
    const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "unknown";

    const response = NextResponse.next();
    response.headers.set("x-user-ip", ip);
    return response;
    // return NextResponse.next();
//   return NextResponse.redirect(new URL('/home', req.url))
}
 
export const config = {
    matcher: '/api/auth/:path*',
  };