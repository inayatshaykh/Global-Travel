# Requirements Document

## Introduction

This document defines the requirements for an Admin Panel feature within the Globe Trotter travel website. The Admin Panel provides authenticated administrators with a dedicated interface to manage travel packages — including creating, editing, and deleting packages — without requiring a backend. All data is stored in React state via Context API. The panel is accessible via dedicated routes under `/admin/*` and is fully protected from unauthenticated access.

## Glossary

- **Admin_Panel**: The protected administrative interface of the Globe Trotter travel website.
- **Auth_Guard**: The route protection component that redirects unauthenticated users to the login page.
- **Package**: A travel offering with a title, price, duration, description, and image.
- **Package_Store**: The React Context-based in-memory state that holds all packages during the session.
- **Admin_User**: An authenticated administrator interacting with the Admin_Panel.
- **Login_Form**: The form component on the login page that accepts email and password credentials.
- **Sidebar**: The persistent left-side navigation component within the Admin_Panel layout.
- **Top_Navbar**: The persistent top navigation bar within the Admin_Panel layout displaying the admin name and logout action.
- **Add_Package_Form**: The form component used to create a new Package.
- **Package_Table**: The component that displays all Packages in a tabular or grid layout with action controls.
- **Image_Preview**: A visual thumbnail rendered from a locally selected image file using a data URL.

---

## Requirements

### Requirement 1: Admin Authentication

**User Story:** As an admin, I want to log in with my credentials, so that I can securely access the Admin_Panel.

#### Acceptance Criteria

1. THE Login_Form SHALL display an email input field and a password input field.
2. WHEN the Admin_User submits the Login_Form with email `admin@gmail.com` and password `Nazim@123`, THE Auth_Guard SHALL grant access and redirect the Admin_User to `/admin/dashboard`.
3. IF the Admin_User submits the Login_Form with any email or password that does not match the demo credentials, THEN THE Login_Form SHALL display an error message indicating invalid credentials.
4. WHILE the Admin_User is not authenticated, THE Auth_Guard SHALL redirect any request to a protected `/admin/*` route to `/admin/login`.
5. WHEN the Admin_User triggers the logout action, THE Admin_Panel SHALL clear the authentication state and redirect the Admin_User to `/admin/login`.
6. WHILE the Admin_User is authenticated, THE Auth_Guard SHALL prevent the Admin_User from accessing `/admin/login` and redirect to `/admin/dashboard`.

---

### Requirement 2: Admin Panel Layout

**User Story:** As an admin, I want a consistent layout with navigation, so that I can move between sections of the Admin_Panel efficiently.

#### Acceptance Criteria

1. THE Sidebar SHALL display navigation links for: Dashboard, Add Package, and Manage Packages.
2. THE Top_Navbar SHALL display the authenticated admin's name and a logout button.
3. WHEN the Admin_User clicks a Sidebar navigation link, THE Admin_Panel SHALL navigate to the corresponding route without a full page reload.
4. WHEN the Admin_User clicks the logout button in the Top_Navbar, THE Admin_Panel SHALL clear authentication state and redirect to `/admin/login`.
5. THE Admin_Panel layout SHALL be responsive and render correctly on screen widths from 320px to 1920px.
6. THE Sidebar SHALL visually highlight the currently active navigation link.

---

### Requirement 3: Dashboard Overview

**User Story:** As an admin, I want a dashboard home page, so that I can see a summary of the current state of travel packages.

#### Acceptance Criteria

1. WHEN the Admin_User navigates to `/admin/dashboard`, THE Admin_Panel SHALL display a dashboard page.
2. THE Admin_Panel SHALL display the total count of Packages currently stored in the Package_Store.
3. THE Admin_Panel SHALL display a quick-action link or button to navigate to the Add Package page.
4. THE Admin_Panel SHALL display a quick-action link or button to navigate to the Manage Packages page.

---

### Requirement 4: Add Package

**User Story:** As an admin, I want to add a new travel package, so that it becomes available in the Package_Store.

#### Acceptance Criteria

1. WHEN the Admin_User navigates to `/admin/add-package`, THE Admin_Panel SHALL display the Add_Package_Form.
2. THE Add_Package_Form SHALL include input fields for: Title (text), Price (number), Duration Days (number), Duration Nights (number), and Description (textarea).
3. THE Add_Package_Form SHALL include a file input that accepts image files (JPEG, PNG, WebP).
4. WHEN the Admin_User selects an image file, THE Add_Package_Form SHALL display an Image_Preview of the selected file.
5. WHEN the Admin_User submits the Add_Package_Form with all required fields populated, THE Package_Store SHALL add the new Package to its collection.
6. IF the Admin_User submits the Add_Package_Form with one or more required fields empty, THEN THE Add_Package_Form SHALL display a validation error for each empty required field and SHALL NOT add a Package to the Package_Store.
7. WHEN a Package is successfully added, THE Add_Package_Form SHALL reset all fields to their default empty state.

---

### Requirement 5: Manage Packages

**User Story:** As an admin, I want to view, edit, and delete packages, so that I can keep the travel offerings up to date.

#### Acceptance Criteria

1. WHEN the Admin_User navigates to `/admin/manage-packages`, THE Admin_Panel SHALL display the Package_Table.
2. THE Package_Table SHALL display each Package's Image_Preview, Title, Price, and Duration.
3. WHEN the Package_Store contains no Packages, THE Package_Table SHALL display an empty-state message indicating no packages exist.
4. THE Package_Table SHALL display an Edit action and a Delete action for each Package row.
5. WHEN the Admin_User clicks the Delete action for a Package, THE Package_Store SHALL remove that Package from its collection and THE Package_Table SHALL update to reflect the removal.
6. WHEN the Admin_User clicks the Edit action for a Package, THE Admin_Panel SHALL display an editable form pre-populated with that Package's existing data.
7. WHEN the Admin_User submits the edit form with valid data, THE Package_Store SHALL update the corresponding Package and THE Admin_Panel SHALL return to the Package_Table view.
8. IF the Admin_User submits the edit form with one or more required fields empty, THEN THE Admin_Panel SHALL display a validation error for each empty required field and SHALL NOT update the Package in the Package_Store.

---

### Requirement 6: State Management

**User Story:** As a developer, I want packages stored in React Context, so that state is shared across all Admin_Panel pages without a backend.

#### Acceptance Criteria

1. THE Package_Store SHALL be implemented using React Context API and `useState`.
2. THE Package_Store SHALL be accessible to all components within the `/admin/*` route tree.
3. WHEN a Package is added, edited, or deleted, THE Package_Store SHALL reflect the change immediately across all components consuming the context.
4. THE Package_Store SHALL assign a unique identifier to each Package at the time of creation.

---

### Requirement 7: Routing and Route Protection

**User Story:** As a developer, I want clearly defined routes and protection, so that unauthenticated users cannot access admin pages.

#### Acceptance Criteria

1. THE Admin_Panel SHALL define the following routes: `/admin/login`, `/admin/dashboard`, `/admin/add-package`, `/admin/manage-packages`.
2. THE Auth_Guard SHALL wrap all routes except `/admin/login`.
3. WHEN an unauthenticated user navigates to any protected route, THE Auth_Guard SHALL redirect to `/admin/login`.
4. THE Admin_Panel routes SHALL be integrated into the existing React Router `BrowserRouter` without affecting existing public routes (`/`, `/package/:id`).

---

### Requirement 8: UI and Visual Design

**User Story:** As an admin, I want a clean, modern interface, so that the Admin_Panel is easy and pleasant to use.

#### Acceptance Criteria

1. THE Admin_Panel SHALL use Tailwind CSS utility classes for all styling.
2. THE Admin_Panel SHALL use card components with rounded corners and drop shadows for content sections.
3. THE Admin_Panel SHALL apply hover transition effects to interactive elements such as buttons, table rows, and navigation links.
4. THE Admin_Panel SHALL use icons from the `lucide-react` library for navigation items and action buttons.
5. THE Admin_Panel SHALL use the existing shadcn/ui component library (`Button`, `Input`, `Label`, `Textarea`, `Table`) where applicable.
