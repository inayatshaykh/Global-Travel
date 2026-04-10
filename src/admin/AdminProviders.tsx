import React from "react";
import { AuthProvider } from "./context/AuthContext";

// PackageProvider is now at the app root (App.tsx) so it's shared with the public site
export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
