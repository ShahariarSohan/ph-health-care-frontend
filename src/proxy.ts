import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {  UserRole } from "./types/userRole";

import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/auth.util";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;


  // const accessToken = request.cookies.get("accessToken")?.value || null;
  const accessToken=await getCookie("accessToken") ||null
  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    userRole = verifiedToken.role;
  }
  console.log("userRole", userRole);

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  //if  logged in user  trying to access auth route

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }
  // if logged in want to access open public route

  if (routeOwner === null) {
    return NextResponse.next();
  }
  //if logged in  user want to access common protected route
    if (!accessToken) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirect",pathname)
    return NextResponse.redirect(loginUrl);
  }
  if (routeOwner === "COMMON") {
    return NextResponse.next();
    }
    if (routeOwner === "ADMIN" || routeOwner === "DOCTOR"
        || routeOwner ==="PATIENT" ) {
        if (userRole !== routeOwner) {
            return NextResponse.redirect(
              new URL(
                getDefaultDashboardRoute(userRole as UserRole),
                request.url
              )
            );
        }
    }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt |.well-known).*)",
  ],
};
