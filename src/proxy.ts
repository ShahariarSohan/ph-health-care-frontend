import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const { pathname } = request.nextUrl;


    const protectedRoutes = ["/dashboard/*", "/profile", "/appointments", "/settings"]
    const authRoutes = ["/login", "/register", "/forget-password"]
    
    const isProtectRoute = protectedRoutes.some((route) => {
      pathname.startsWith(route);
    });
    const isAuthRoute = authRoutes.some((route) => 
        pathname === route
    )
    if (isProtectRoute && !token) {
        return NextResponse.redirect(new URL("/login",request.url))
    }
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/",request.url))
    }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forget-password"],
};
