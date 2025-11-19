export interface IAdmin {
  id?: string;
  name: string;
  email: string;
  password: string; // Create only
  contactNumber: string;
  profilePhoto?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
