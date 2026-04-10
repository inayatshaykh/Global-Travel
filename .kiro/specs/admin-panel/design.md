# Design Document

## Admin Panel Feature

---

## Overview

The Admin Panel is a protected, client-side-only administrative interface for the Globe Trotter travel website. It allows authenticated administrators to create, read, update, and delete (CRUD) travel packages. All state is held in-memory via React Context API — no backend or persistence layer is required.

The panel lives under the `/admin/*` route namespace and is fully isolated from the public-facing site. Authentication is simulated with hardcoded demo credentials. Route protection is enforced by an `AuthGuard` component that redirects unauthenticated users to the login page.

---

## Architecture

The admin panel follows a layered component architecture:

```
App (BrowserRouter)
├── Public Routes (/, /package/:id)
└── Admin Routes (/admin/*)
    ├── /admin/login          → AdminLogin (unprotected)
    └── AuthGuard (wraps all below)
        └── AdminLayout (Sidebar + TopNavbar)
            ├── /admin/dashboard        → Dashboard
            ├── /admin/add-package      → AddPackage
            └── /admin/manage-packages  → ManagePackages
```

**State providers** wrap the admin route tree:

```
AdminProviders
├── AuthProvider   (authentication state)
└── PackageProvider (package CRUD state)
```

Both providers are scoped to the `/admin/*` subtree so they don't pollute the public app.

### Key Design Decisions

- **No backend**: All state lives in `useState` inside Context providers. Data resets on page refresh — acceptable for a demo admin panel.
- **Scoped providers**: `AuthProvider` and `PackageProvider` are mounted only inside the admin route subtree, keeping the public app clean.
- **AuthGuard as a layout wrapper**: Rather than per-route guards, a single `AuthGuard` component wraps the protected layout, simplifying route definitions.
- **Image as data URL**: Selected images are converted to base64 data URLs via `FileReader` so they can be stored in React state without a file upload endpoint.

---

## Components and Interfaces

### Route Structure

```tsx
// In App.tsx additions
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/*" element={
  <AdminProviders>
    <AuthGuard>
      <AdminLayout />
    </AuthGuard>
  </AdminProviders>
}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="add-package" element={<AddPackage />} />
  <Route path="manage-packages" element={<ManagePackages />} />
</Route>
```

### Component Inventory

| Component | Path | Responsibility |
|---|---|---|
| `AdminProviders` | `src/admin/AdminProviders.tsx` | Composes AuthProvider + PackageProvider |
| `AuthProvider` | `src/admin/context/AuthContext.tsx` | Auth state, login, logout |
| `PackageProvider` | `src/admin/context/PackageContext.tsx` | Package CRUD state |
| `AuthGuard` | `src/admin/components/AuthGuard.tsx` | Redirects unauthenticated users |
| `AdminLayout` | `src/admin/components/AdminLayout.tsx` | Sidebar + TopNavbar shell with `<Outlet />` |
| `Sidebar` | `src/admin/components/Sidebar.tsx` | Nav links with active highlight |
| `TopNavbar` | `src/admin/components/TopNavbar.tsx` | Admin name + logout button |
| `AdminLogin` | `src/admin/pages/AdminLogin.tsx` | Login form page |
| `Dashboard` | `src/admin/pages/Dashboard.tsx` | Stats + quick-action cards |
| `AddPackage` | `src/admin/pages/AddPackage.tsx` | Add package form page |
| `ManagePackages` | `src/admin/pages/ManagePackages.tsx` | Package table with edit/delete |
| `PackageForm` | `src/admin/components/PackageForm.tsx` | Shared form for add and edit |
| `PackageTable` | `src/admin/components/PackageTable.tsx` | Table with actions |

### Component Interfaces

```tsx
// AuthContext
interface AuthContextValue {
  isAuthenticated: boolean;
  adminName: string;
  login: (email: string, password: string) => boolean; // returns false on bad creds
  logout: () => void;
}

// PackageContext
interface PackageContextValue {
  packages: Package[];
  addPackage: (data: PackageFormData) => void;
  updatePackage: (id: string, data: PackageFormData) => void;
  deletePackage: (id: string) => void;
}

// PackageForm props
interface PackageFormProps {
  initialValues?: PackageFormData;
  onSubmit: (data: PackageFormData) => void;
  onCancel?: () => void;
}
```

---

## Data Models

### Package

The core entity managed by the admin panel:

```ts
interface Package {
  id: string;           // UUID generated at creation time (crypto.randomUUID())
  title: string;
  price: number;        // stored as number, displayed formatted
  durationDays: number;
  durationNights: number;
  description: string;
  imageDataUrl: string; // base64 data URL from FileReader
}
```

### PackageFormData

The shape of data collected by the form (before ID assignment):

```ts
interface PackageFormData {
  title: string;
  price: number;
  durationDays: number;
  durationNights: number;
  description: string;
  imageDataUrl: string;
}
```

### AuthState

```ts
interface AuthState {
  isAuthenticated: boolean;
  adminName: string; // "Admin" when authenticated
}
```

### Demo Credentials (hardcoded)

```ts
const DEMO_EMAIL = "admin@gmail.com";
const DEMO_PASSWORD = "Nazim@123";
```

### Validation Rules

All fields in `PackageFormData` are required. Validation is performed before submission:

| Field | Rule |
|---|---|
| `title` | Non-empty string after trim |
| `price` | Positive number > 0 |
| `durationDays` | Positive integer > 0 |
| `durationNights` | Positive integer > 0 |
| `description` | Non-empty string after trim |
| `imageDataUrl` | Non-empty (file must be selected) |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Invalid credentials are rejected

*For any* (email, password) pair that is not exactly `("admin@gmail.com", "Nazim@123")`, calling `login(email, password)` should return `false` and leave `isAuthenticated` as `false`.

**Validates: Requirements 1.3**

---

### Property 2: Unauthenticated users are redirected to login

*For any* protected route under `/admin/*` (excluding `/admin/login`), when the user is not authenticated, navigating to that route should result in a redirect to `/admin/login`.

**Validates: Requirements 1.4, 7.2, 7.3**

---

### Property 3: Active sidebar link is highlighted

*For any* route that corresponds to a sidebar navigation link, rendering the Sidebar while on that route should result in exactly that link having the active highlight class applied.

**Validates: Requirements 2.6**

---

### Property 4: Dashboard package count matches store

*For any* list of packages in the Package_Store, the count displayed on the Dashboard should equal the length of that list.

**Validates: Requirements 3.2**

---

### Property 5: Adding a valid package grows the store

*For any* valid `PackageFormData` (all fields non-empty, price and durations positive), calling `addPackage(data)` should increase the packages array length by exactly one and the new package should contain all the submitted field values.

**Validates: Requirements 4.5**

---

### Property 6: Form validation rejects submissions with empty required fields

*For any* `PackageFormData` where one or more required fields are empty or blank, submitting the form should not call `addPackage` or `updatePackage`, the packages array should remain unchanged, and a validation error should be present for each empty field.

**Validates: Requirements 4.6, 5.8**

---

### Property 7: Form resets after successful submission

*For any* valid `PackageFormData` submitted to the Add Package form, after a successful submission all form field values should return to their initial empty/default state.

**Validates: Requirements 4.7**

---

### Property 8: Package table displays all package data

*For any* list of packages in the Package_Store, rendering the Package_Table should produce a row for each package that contains the package's title, formatted price, and duration.

**Validates: Requirements 5.2**

---

### Property 9: Each package row has edit and delete actions

*For any* non-empty list of packages, every row rendered by the Package_Table should contain both an Edit action control and a Delete action control.

**Validates: Requirements 5.4**

---

### Property 10: Deleting a package removes it from the store

*For any* Package_Store containing at least one package, calling `deletePackage(id)` for a package that exists should result in that package no longer appearing in the packages array, and the array length should decrease by exactly one.

**Validates: Requirements 5.5**

---

### Property 11: Edit form is pre-populated with existing package data

*For any* package in the Package_Store, when the edit action is triggered for that package, the rendered form fields should contain values that match the package's existing title, price, duration, and description.

**Validates: Requirements 5.6**

---

### Property 12: Editing a package updates it in the store

*For any* package in the Package_Store and any valid `PackageFormData`, calling `updatePackage(id, data)` should result in the package with that ID having its fields updated to the new values, while all other packages remain unchanged.

**Validates: Requirements 5.7**

---

### Property 13: All package IDs are unique

*For any* sequence of `addPackage` calls, all packages in the resulting store should have distinct `id` values — no two packages should share the same ID.

**Validates: Requirements 6.4**

---

## Error Handling

### Authentication Errors

- Invalid credentials: `login()` returns `false`; the Login_Form displays an inline error message ("Invalid email or password"). No redirect occurs.
- Accessing a protected route while unauthenticated: `AuthGuard` renders `<Navigate to="/admin/login" replace />` immediately.
- Accessing `/admin/login` while authenticated: `AuthGuard` renders `<Navigate to="/admin/dashboard" replace />`.

### Form Validation Errors

- Each required field is validated on submit (not on blur, to keep UX simple).
- Errors are displayed inline beneath each invalid field using a `<p className="text-destructive text-sm">` element.
- Submission is blocked until all fields pass validation.
- Image field: if no file is selected, an error message "Please select an image" is shown.

### Image Loading Errors

- If `FileReader` fails to read the selected file, the image preview is not shown and an error message is displayed.
- Invalid file types are prevented by the `accept` attribute on the file input (`image/jpeg,image/png,image/webp`).

### Context / State Errors

- `deletePackage` with a non-existent ID is a no-op (filter returns the same array).
- `updatePackage` with a non-existent ID is a no-op (map returns the same array).
- Consuming context outside its provider throws a descriptive error: `"useAuth must be used within AuthProvider"`.

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used. They are complementary:

- **Unit tests** cover specific examples, edge cases, and integration points.
- **Property-based tests** verify universal behaviors across randomly generated inputs.

### Property-Based Testing Library

Use **`fast-check`** — a mature property-based testing library for TypeScript/JavaScript that integrates seamlessly with Vitest.

Install: `npm install --save-dev fast-check`

Each property test runs a minimum of **100 iterations** (fast-check default). Configure via `fc.assert(fc.property(...), { numRuns: 100 })`.

Each property test must be tagged with a comment referencing the design property:
```ts
// Feature: admin-panel, Property 1: Invalid credentials are rejected
```

### Unit Tests (specific examples and edge cases)

| Test | Validates |
|---|---|
| Login form renders email and password inputs | Req 1.1 |
| Correct credentials grant access and redirect to dashboard | Req 1.2 |
| Logout clears auth state | Req 1.5 |
| Authenticated user is redirected away from login page | Req 1.6 |
| Sidebar renders Dashboard, Add Package, Manage Packages links | Req 2.1 |
| TopNavbar renders admin name and logout button | Req 2.2 |
| Dashboard renders when navigating to /admin/dashboard | Req 3.1 |
| Dashboard shows quick-action link to Add Package | Req 3.3 |
| Dashboard shows quick-action link to Manage Packages | Req 3.4 |
| Add Package form renders all required fields | Req 4.2 |
| File input has correct accept attribute | Req 4.3 |
| Selecting an image file shows a preview | Req 4.4 |
| Package table shows empty-state message when store is empty | Req 5.3 |
| All four admin routes render the correct component | Req 7.1 |
| Public routes (/, /package/:id) are unaffected by admin routes | Req 7.4 |

### Property-Based Tests

Each property below corresponds to a Correctness Property in this document. Each must be implemented as a single `fast-check` property test.

| Property Test | Design Property | fast-check Arbitraries |
|---|---|---|
| Invalid credentials are rejected | Property 1 | `fc.string()` × 2, filtered to exclude demo creds |
| Unauthenticated redirect for all protected routes | Property 2 | `fc.constantFrom(...protectedRoutes)` |
| Active sidebar link highlighted | Property 3 | `fc.constantFrom(...navRoutes)` |
| Dashboard count matches store length | Property 4 | `fc.array(packageArb)` |
| Adding valid package grows store by one | Property 5 | `packageFormDataArb` |
| Form rejects any submission with empty fields | Property 6 | `fc.subarray(requiredFields, {minLength: 1})` |
| Form resets after successful submission | Property 7 | `packageFormDataArb` |
| Table renders a row per package with correct data | Property 8 | `fc.array(packageArb, {minLength: 1})` |
| Each row has edit and delete actions | Property 9 | `fc.array(packageArb, {minLength: 1})` |
| Delete removes exactly one package | Property 10 | `fc.array(packageArb, {minLength: 1})` + index |
| Edit form pre-populated with package data | Property 11 | `packageArb` |
| Update changes only the target package | Property 12 | `fc.array(packageArb, {minLength: 1})` + index + `packageFormDataArb` |
| All package IDs are unique | Property 13 | `fc.array(packageFormDataArb, {minLength: 2})` |

### Test File Structure

```
src/
  admin/
    context/
      AuthContext.test.ts
      PackageContext.test.ts
    components/
      AuthGuard.test.tsx
      Sidebar.test.tsx
      TopNavbar.test.tsx
      PackageForm.test.tsx
      PackageTable.test.tsx
    pages/
      AdminLogin.test.tsx
      Dashboard.test.tsx
      AddPackage.test.tsx
      ManagePackages.test.tsx
```
