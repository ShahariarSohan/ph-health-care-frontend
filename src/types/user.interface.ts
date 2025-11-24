
import { IAdmin } from "./admin.interface";
import { IDoctor } from "./doctor.interface";
import { IPatient } from "./patient.interface";
import { UserRole } from "./userRole";

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  admin?: IAdmin;
  patient?: IPatient;
  doctor?: IDoctor;
  createdAt: string;
  updatedAt: string;
}
