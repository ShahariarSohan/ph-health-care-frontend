import getUserInfo from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { IUserInfo } from "@/types/user.interface";
import { getDefaultDashboardRoute } from "@/lib/auth.util";
import { INavSection } from "@/types/dashboard.interface";
import { UserRole } from "@/types/userRole";
import { getNavItemsByRole } from "@/lib/navItems.config";

export default async function DashboardNavbar() {
  const userInfo = await getUserInfo() as IUserInfo
  const navItems: INavSection[] = getNavItemsByRole(userInfo.role as UserRole)
    const dashboardHome=getDefaultDashboardRoute(userInfo.role as UserRole)
  return <DashboardNavbarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}></DashboardNavbarContent>
}