export interface IPatient {
  id?: string;
  name: string;
  email: string;
  contactNumber?: string;
  address: string;
  profilePhoto?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  // Additional patient-specific fields based on backend schema
  medicalRecord?: {
    id: string;
    // medical history fields
  };
}
