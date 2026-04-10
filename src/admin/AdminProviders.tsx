import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { PackageProvider } from "./context/PackageContext";

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PackageProvider>{children}</PackageProvider>
    </AuthProvider>
  );
}
