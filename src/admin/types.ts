export interface PackageFeature {
  label: string;
  detail: string;
}

export interface Package {
  id: string;           // UUID generated at creation time
  title: string;
  price: number;
  durationDays: number;
  durationNights: number;
  description: string;
  imageDataUrl: string; // base64 data URL or asset URL
  features: PackageFeature[];
  isAdminAdded?: boolean;
}

export interface PackageFormData {
  title: string;
  price: number;
  durationDays: number;
  durationNights: number;
  description: string;
  imageDataUrl: string;
  features: PackageFeature[];
}

export interface AuthState {
  isAuthenticated: boolean;
  adminName: string;
}
