# Implementation Plan: Admin Panel

## Overview

Implement a protected admin panel under `/admin/*` with authentication, package CRUD, and a shared layout. All state is managed via React Context API with no backend. Uses TypeScript, React, Tailwind CSS, shadcn/ui, and fast-check for property-based tests.

## Tasks

- [x] 1. Install fast-check and set up admin directory structure
  - Run `npm install --save-dev fast-check` in the project root
  - Create the `src/admin/` directory tree: `context/`, `components/`, `pages/`
  - _Requirements: 8.1_

- [x] 2. Define shared TypeScript types
  - [x] 2.1 Create `src/admin/types.ts` with `Package`, `PackageFormData`, and `AuthState` interfaces
    - Include all fields from the data models: `id`, `title`, `price`, `durationDays`, `durationNights`, `description`, `imageDataUrl`
    - _Requirements: 6.1, 6.4_

- [x] 3. Implement AuthContext
  - [x] 3.1 Create `src/admin/context/AuthContext.tsx` with `AuthProvider` and `useAuth` hook
    - Hardcode `DEMO_EMAIL = "admin@gmail.com"` and `DEMO_PASSWORD = "Nazim@123"`
    - `login()` returns `false` for non-matching credentials, sets `isAuthenticated` and `adminName` on success
    - `logout()` clears auth state
    - Throw descriptive error when `useAuth` is used outside provider
    - _Requirements: 1.2, 1.3, 1.5_

  - [ ]* 3.2 Write property test for invalid credentials rejection (Property 1)
    - **Property 1: Invalid credentials are rejected**
    - **Validates: Requirements 1.3**
    - Use `fc.string()` × 2 filtered to exclude demo credentials
    - Tag: `// Feature: admin-panel, Property 1: Invalid credentials are rejected`

  - [ ]* 3.3 Write unit tests for AuthContext
    - Test correct credentials grant access
    - Test logout clears auth state
    - Test authenticated user redirect away from login
    - _Requirements: 1.2, 1.5, 1.6_

- [x] 4. Implement PackageContext
  - [x] 4.1 Create `src/admin/context/PackageContext.tsx` with `PackageProvider` and `usePackages` hook
    - Implement `addPackage`, `updatePackage`, `deletePackage` using `useState`
    - `addPackage` assigns a unique ID via `crypto.randomUUID()`
    - `deletePackage` and `updatePackage` with non-existent ID are no-ops
    - Throw descriptive error when `usePackages` is used outside provider
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 4.2 Write property test for adding a valid package grows the store (Property 5)
    - **Property 5: Adding a valid package grows the store**
    - **Validates: Requirements 4.5**
    - Use a `packageFormDataArb` arbitrary with non-empty strings and positive numbers

  - [ ]* 4.3 Write property test for delete removes exactly one package (Property 10)
    - **Property 10: Deleting a package removes it from the store**
    - **Validates: Requirements 5.5**
    - Use `fc.array(packageArb, {minLength: 1})` + index arbitrary

  - [ ]* 4.4 Write property test for update changes only the target package (Property 12)
    - **Property 12: Editing a package updates it in the store**
    - **Validates: Requirements 5.7**
    - Use `fc.array(packageArb, {minLength: 1})` + index + `packageFormDataArb`

  - [ ]* 4.5 Write property test for all package IDs are unique (Property 13)
    - **Property 13: All package IDs are unique**
    - **Validates: Requirements 6.4**
    - Use `fc.array(packageFormDataArb, {minLength: 2})`

- [x] 5. Checkpoint — Ensure all context tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement AuthGuard and AdminProviders
  - [x] 6.1 Create `src/admin/components/AuthGuard.tsx`
    - If not authenticated, render `<Navigate to="/admin/login" replace />`
    - If authenticated and on `/admin/login`, render `<Navigate to="/admin/dashboard" replace />`
    - Otherwise render `<Outlet />`
    - _Requirements: 1.4, 1.6, 7.2, 7.3_

  - [ ]* 6.2 Write property test for unauthenticated redirect (Property 2)
    - **Property 2: Unauthenticated users are redirected to login**
    - **Validates: Requirements 1.4, 7.2, 7.3**
    - Use `fc.constantFrom('/admin/dashboard', '/admin/add-package', '/admin/manage-packages')`

  - [x] 6.3 Create `src/admin/AdminProviders.tsx` composing `AuthProvider` and `PackageProvider`
    - _Requirements: 6.2_

- [x] 7. Implement Sidebar and TopNavbar
  - [x] 7.1 Create `src/admin/components/Sidebar.tsx`
    - Render nav links for Dashboard (`/admin/dashboard`), Add Package (`/admin/add-package`), Manage Packages (`/admin/manage-packages`)
    - Use `lucide-react` icons for each link
    - Apply active highlight class using `useLocation` or `NavLink` `isActive`
    - _Requirements: 2.1, 2.3, 2.6, 8.3, 8.4_

  - [ ]* 7.2 Write property test for active sidebar link highlighted (Property 3)
    - **Property 3: Active sidebar link is highlighted**
    - **Validates: Requirements 2.6**
    - Use `fc.constantFrom('/admin/dashboard', '/admin/add-package', '/admin/manage-packages')`

  - [ ]* 7.3 Write unit tests for Sidebar
    - Test all three nav links render
    - _Requirements: 2.1_

  - [x] 7.4 Create `src/admin/components/TopNavbar.tsx`
    - Display `adminName` from `useAuth`
    - Render a logout button that calls `logout()` and redirects to `/admin/login`
    - Use `lucide-react` icons
    - _Requirements: 2.2, 2.4, 8.4_

  - [ ]* 7.5 Write unit tests for TopNavbar
    - Test admin name is displayed
    - Test logout button triggers logout and redirect
    - _Requirements: 2.2, 2.4_

- [x] 8. Implement AdminLayout
  - [x] 8.1 Create `src/admin/components/AdminLayout.tsx`
    - Compose `Sidebar` + `TopNavbar` with `<Outlet />` for page content
    - Apply responsive layout using Tailwind CSS (flex/grid, works 320px–1920px)
    - _Requirements: 2.5, 8.1, 8.2_

- [x] 9. Implement PackageForm (shared add/edit form)
  - [x] 9.1 Create `src/admin/components/PackageForm.tsx`
    - Accept `initialValues?: PackageFormData` and `onSubmit`, `onCancel` props
    - Render inputs for Title, Price, Duration Days, Duration Nights, Description, and image file input (`accept="image/jpeg,image/png,image/webp"`)
    - Convert selected image to base64 data URL via `FileReader` and show `Image_Preview`
    - Validate all fields on submit; display inline `<p className="text-destructive text-sm">` errors for empty/invalid fields
    - Block submission if any field fails validation
    - Use shadcn/ui `Button`, `Input`, `Label`, `Textarea`
    - _Requirements: 4.2, 4.3, 4.4, 4.6, 5.6, 5.8, 8.5_

  - [ ]* 9.2 Write property test for form validation rejects empty fields (Property 6)
    - **Property 6: Form validation rejects submissions with empty required fields**
    - **Validates: Requirements 4.6, 5.8**
    - Use `fc.subarray(['title','price','durationDays','durationNights','description','imageDataUrl'], {minLength: 1})` to pick fields to blank out

  - [ ]* 9.3 Write property test for form resets after successful submission (Property 7)
    - **Property 7: Form resets after successful submission**
    - **Validates: Requirements 4.7**
    - Use `packageFormDataArb` and verify all fields return to empty/default after submit

  - [ ]* 9.4 Write unit tests for PackageForm
    - Test all required fields render
    - Test file input accept attribute
    - Test image preview appears after file selection
    - _Requirements: 4.2, 4.3, 4.4_

- [x] 10. Implement PackageTable
  - [x] 10.1 Create `src/admin/components/PackageTable.tsx`
    - Accept `packages` array and `onEdit`, `onDelete` callbacks
    - Render each package row with image thumbnail, title, formatted price, and duration
    - Show empty-state message when `packages` is empty
    - Render Edit and Delete action buttons per row using `lucide-react` icons and shadcn/ui `Button`
    - Apply hover transition effects to rows
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 8.3, 8.4, 8.5_

  - [ ]* 10.2 Write property test for table renders a row per package (Property 8)
    - **Property 8: Package table displays all package data**
    - **Validates: Requirements 5.2**
    - Use `fc.array(packageArb, {minLength: 1})`

  - [ ]* 10.3 Write property test for each row has edit and delete actions (Property 9)
    - **Property 9: Each package row has edit and delete actions**
    - **Validates: Requirements 5.4**
    - Use `fc.array(packageArb, {minLength: 1})`

  - [ ]* 10.4 Write unit tests for PackageTable
    - Test empty-state message renders when packages array is empty
    - _Requirements: 5.3_

- [x] 11. Checkpoint — Ensure all component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Implement admin pages
  - [x] 12.1 Create `src/admin/pages/AdminLogin.tsx`
    - Render email and password inputs with a submit button
    - Call `login()` on submit; display inline error on failure
    - Redirect to `/admin/dashboard` on success
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ]* 12.2 Write unit tests for AdminLogin
    - Test email and password inputs render
    - Test invalid credentials show error message
    - _Requirements: 1.1, 1.3_

  - [x] 12.3 Create `src/admin/pages/Dashboard.tsx`
    - Display total package count from `usePackages`
    - Render quick-action buttons/links to `/admin/add-package` and `/admin/manage-packages`
    - Use shadcn/ui card components with rounded corners and drop shadows
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 8.2_

  - [ ]* 12.4 Write property test for dashboard count matches store length (Property 4)
    - **Property 4: Dashboard package count matches store**
    - **Validates: Requirements 3.2**
    - Use `fc.array(packageArb)` and verify displayed count equals array length

  - [ ]* 12.5 Write unit tests for Dashboard
    - Test dashboard renders at `/admin/dashboard`
    - Test quick-action links to Add Package and Manage Packages
    - _Requirements: 3.1, 3.3, 3.4_

  - [x] 12.6 Create `src/admin/pages/AddPackage.tsx`
    - Render `PackageForm` with no `initialValues`
    - On submit call `addPackage()` from `usePackages`, then reset form
    - _Requirements: 4.1, 4.5, 4.7_

  - [x] 12.7 Create `src/admin/pages/ManagePackages.tsx`
    - Render `PackageTable` with packages from `usePackages`
    - Handle delete by calling `deletePackage(id)`
    - Handle edit by showing `PackageForm` pre-populated with the selected package's data inline or in a modal
    - On edit submit call `updatePackage(id, data)` and return to table view
    - _Requirements: 5.1, 5.5, 5.6, 5.7, 5.8_

  - [ ]* 12.8 Write property test for edit form pre-populated with package data (Property 11)
    - **Property 11: Edit form is pre-populated with existing package data**
    - **Validates: Requirements 5.6**
    - Use `packageArb` and verify form field values match package fields

  - [ ]* 12.9 Write unit tests for ManagePackages
    - Test all four admin routes render the correct component
    - Test public routes are unaffected
    - _Requirements: 7.1, 7.4_

- [x] 13. Wire admin routes into App.tsx
  - [x] 13.1 Add `/admin/login` and `/admin/*` routes to `src/App.tsx`
    - Mount `AdminProviders` + `AuthGuard` + `AdminLayout` for protected routes
    - Ensure existing public routes (`/`, `/package/:id`) are unaffected
    - _Requirements: 7.1, 7.4_

- [x] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check; install with `npm install --save-dev fast-check`
- Checkpoints ensure incremental validation at logical boundaries
