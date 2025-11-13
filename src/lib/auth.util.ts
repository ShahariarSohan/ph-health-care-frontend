

import {  UserRole } from "@/types/userRole";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};
export const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];
export const commonProtectedRoute: RouteConfig = {
  exact: ["/my-profile", "/settings","/change-password"],
  patterns: [],
};
export const adminProtectedRoute: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};
export const doctorProtectedRoute: RouteConfig = {
  patterns: [/^\/doctor/],
  exact: [],
};
export const patientProtectedRoute: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};
export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};
export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};
export const getRouteOwner = (pathname: string): "ADMIN"|"DOCTOR"|"PATIENT"|"COMMON" | null => {
  if (isRouteMatches(pathname, commonProtectedRoute)) {
    return "COMMON";
  }
  if (isRouteMatches(pathname, adminProtectedRoute)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, doctorProtectedRoute)) {
    return "DOCTOR";
  }
  if (isRouteMatches(pathname, patientProtectedRoute)) {
    return "PATIENT";
  }
  return null;
};
export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === UserRole.ADMIN) {
    return "/admin/dashboard";
  }
  if (role === UserRole.DOCTOR) {
    return "/doctor/dashboard";
  }
  if (role === UserRole.PATIENT) {
    return "/dashboard";
  }
  return "/";
};
export const validRedirectForRole= (redirectPath: string ,userRole:UserRole) => {
    const routeOwner = getRouteOwner(redirectPath)
if (routeOwner === null || routeOwner === "COMMON") {
        return true
    }
    if (routeOwner===userRole) {
        return true
    }
    return false;
}