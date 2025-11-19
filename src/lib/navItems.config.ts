import { UserRole } from "@/types/userRole";
import { getDefaultDashboardRoute } from "./auth.util";
import { INavSection } from "@/types/dashboard.interface";

export const getCommonNavItems = (role: UserRole) => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: [UserRole.ADMIN, UserRole.PATIENT, UserRole.DOCTOR],
        },
        {
          title: "My Profile",
          href: "my-profile",
          icon: "User",
          roles: [UserRole.ADMIN, UserRole.PATIENT, UserRole.DOCTOR],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "change-password",
          icon: "Settings",
          roles: [UserRole.ADMIN, UserRole.PATIENT, UserRole.DOCTOR],
        },
      ],
    },
  ];
};
export const doctorNavItems: INavSection[] = [
  {
    title: "Patient Management",
    items: [
      {
        title: "Appointments",
        href: "/doctor/dashboard/appointments",
        icon: "Calendar", // ✅ String
        badge: "3",
        roles: [UserRole.DOCTOR],
      },
      {
        title: "My Schedules",
        href: "/doctor/dashboard/my-schedules",
        icon: "Clock", // ✅ String
        roles: [UserRole.DOCTOR],
      },
      {
        title: "Prescriptions",
        href: "/doctor/dashboard/prescriptions",
        icon: "FileText", // ✅ String
        roles: [UserRole.DOCTOR],
      },
    ],
  },
];

export const patientNavItems: INavSection[] = [
  {
    title: "Appointments",
    items: [
      {
        title: "My Appointments",
        href: "/dashboard/my-appointments",
        icon: "Calendar", // ✅ String
        roles: [UserRole.PATIENT],
      },
      {
        title: "Book Appointment",
        href: "/consultation",
        icon: "ClipboardList", // ✅ String
        roles: [UserRole.PATIENT],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText", // ✅ String
        roles: [UserRole.PATIENT],
      },
      {
        title: "Health Records",
        href: "/dashboard/health-records",
        icon: "Activity", // ✅ String
        roles: [UserRole.PATIENT],
      },
    ],
  },
];

export const adminNavItems: INavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield", // ✅ String
        roles: [UserRole.ADMIN],
      },
      {
        title: "Doctors",
        href: "/admin/dashboard/doctors-management",
        icon: "Stethoscope", // ✅ String
        roles: [UserRole.ADMIN],
      },
      {
        title: "Patients",
        href: "/admin/dashboard/patients-management",
        icon: "Users", // ✅ String
        roles: [UserRole.ADMIN],
      },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar", // ✅ String
        roles: [UserRole.ADMIN],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock", // ✅ String
        roles: [UserRole.ADMIN],
      },
      {
        title: "Specialties",
        href: "/admin/dashboard/specialties-management",
        icon: "Hospital", // ✅ String
        roles: [UserRole.ADMIN],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): INavSection[] => {
  const commonNavItems = getCommonNavItems(role);
  switch (role) {
    case UserRole.ADMIN:
      return [...commonNavItems, ...adminNavItems];
    case UserRole.DOCTOR:
      return [...commonNavItems, ...doctorNavItems];
    case UserRole.PATIENT:
      return [...commonNavItems, ...patientNavItems];
    default:
      return [];
  }
};
