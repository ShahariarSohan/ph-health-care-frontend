import { IUserInfo } from "./user.interface";
import { UserRole } from "./userRole";

export interface INavItem{
    title: string;
    href: string;
    icon: string;
    badge?: string | number;
    description?: string;
    roles:UserRole[]
}


export interface INavSection{
    title?: string;
    items: INavItem[];
}

export interface IDashboardContentProps{
  userInfo: IUserInfo;
   navItems: INavSection[];
    dashboardHome: string;
}