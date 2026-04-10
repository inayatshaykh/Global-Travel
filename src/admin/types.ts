export interface Package {
  id: string;           // UUID generated at creation time
  title: string;
  price: number;
  durationDays: number;
  durationNights: number;
  description: string;
  imageDataUrl: string; // base64 data URL
}

export interface PackageFormData {
  title: string;
  price: number;
  durationDays: number;
  durationNights: number;
  description: string;
  imageDataUrl: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  adminName: string;
}
