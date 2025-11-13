
import { IUserInfo } from "@/types/user.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";
import getUserInfo from "@/services/auth/getUserInfo";
import { INavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute } from "@/lib/auth.util";
import { UserRole } from "@/types/userRole";
import { getNavItemsByRole } from "@/lib/navItems.config";

export default async function DashboardSidebar() {
  const userInfo = (await getUserInfo()) as IUserInfo
  const navItems: INavSection[] = getNavItemsByRole(userInfo.role as UserRole)
  const dashboardHome=getDefaultDashboardRoute(userInfo.role as UserRole)
  return <DashboardSidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome}></DashboardSidebarContent>
}