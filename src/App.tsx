import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import PackageDetails from "./pages/PackageDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminProviders from "./admin/AdminProviders";
import AuthGuard from "./admin/components/AuthGuard";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import AddPackage from "./admin/pages/AddPackage";
import ManagePackages from "./admin/pages/ManagePackages";
import AddTestimonial from "./admin/pages/AddTestimonial";
import ManageTestimonials from "./admin/pages/ManageTestimonials";
import { PackageProvider } from "./admin/context/PackageContext";
import { TestimonialProvider } from "./admin/context/TestimonialContext";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PackageProvider>
        <TestimonialProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/admin/login" element={
                <AdminProviders>
                  <AdminLogin />
                </AdminProviders>
              } />
              <Route path="/admin" element={
                <AdminProviders>
                  <AuthGuard />
                </AdminProviders>
              }>
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="add-package" element={<AddPackage />} />
                  <Route path="manage-packages" element={<ManagePackages />} />
                  <Route path="add-testimonial" element={<AddTestimonial />} />
                  <Route path="manage-testimonials" element={<ManageTestimonials />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TestimonialProvider>
      </PackageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
