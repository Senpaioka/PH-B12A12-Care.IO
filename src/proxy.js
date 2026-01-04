import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const privateRoutes = ["/profile", "/dashboard", "/notification"];
// const caregiverRoutes = ["/notification"];
const adminRoutes = ["/dashboard/applicant", "/dashboard/users"];
const authRoutes = ["/login", "/register"];

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  /* -------------------------------------------------
     1. Get user IP (once)
  -------------------------------------------------- */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    req.ip ||
    "unknown";

  const response = NextResponse.next();
  response.headers.set("x-user-ip", ip);

  /* -------------------------------------------------
     2. Read NextAuth JWT
  -------------------------------------------------- */
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const role = token?.role; // user | caregiver | admin

  /* -------------------------------------------------
     3. Auth pages (login/register)
        Block if already logged in
  -------------------------------------------------- */
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return response;
  }

  /* -------------------------------------------------
     4. Private routes (any logged-in user)
  -------------------------------------------------- */
  if (privateRoutes.some(route => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${pathname}`, req.url)
      );
    }
  }

  /* -------------------------------------------------
     5. Caregiver-only routes
  -------------------------------------------------- */
  // if (caregiverRoutes.some(route => pathname.startsWith(route))) {
  //   if (!isLoggedIn || !["caregiver", "admin"].includes(role)) {
  //     return NextResponse.redirect(new URL("/unauthorized", req.url));
  //   }
  // }


  /* -------------------------------------------------
     6. Admin-only routes
  -------------------------------------------------- */
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (!isLoggedIn || role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return response;
}

/* -------------------------------------------------
   7. Apply middleware
-------------------------------------------------- */
export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/notification/:path*",
    "/login",
    "/register",
    "/api/auth/:path*",
  ],
};