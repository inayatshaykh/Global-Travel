import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { TestimonialProvider } from "./context/TestimonialContext";

// PackageProvider and TestimonialProvider are now at the app root (App.tsx) so they're shared with the public site
export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TestimonialProvider>
        {children}
      </TestimonialProvider>
    </AuthProvider>
  );
}
