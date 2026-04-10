import { createContext, useContext, useState } from "react";
import type { Package, PackageFormData } from "../types";
import { destinations } from "@/data/destinations";

interface PackageContextValue {
  packages: Package[];
  addPackage: (data: PackageFormData) => void;
  updatePackage: (id: string, data: PackageFormData) => void;
  deletePackage: (id: string) => void;
}

const PackageContext = createContext<PackageContextValue | null>(null);

// Seed initial packages from the hardcoded destinations data
const seedPackages: Package[] = destinations.map((d) => ({
  id: d.id,
  title: d.title,
  price: parseFloat(d.price.replace(/[₹$,]/g, "")),
  durationDays: parseInt(d.days),
  durationNights: parseInt(d.days.split("/")[1] ?? "0"),
  description: d.description,
  imageDataUrl: d.image,
  features: d.features ?? [],
  isAdminAdded: false,
}));

export function PackageProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<Package[]>(seedPackages);

  const addPackage = (data: PackageFormData) => {
    const newPackage: Package = { id: crypto.randomUUID(), ...data };
    setPackages((prev) => [...prev, newPackage]);
  };

  const updatePackage = (id: string, data: PackageFormData) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...data } : pkg))
    );
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  return (
    <PackageContext.Provider value={{ packages, addPackage, updatePackage, deletePackage }}>
      {children}
    </PackageContext.Provider>
  );
}

export function usePackages(): PackageContextValue {
  const ctx = useContext(PackageContext);
  if (!ctx) {
    throw new Error("usePackages must be used within PackageProvider");
  }
  return ctx;
}
