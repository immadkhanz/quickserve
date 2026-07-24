# ZYNVEX SOFTWARE ENGINEERING INTERNSHIP
## MODULE 4 TECHNICAL REPORT: PORTALS & ADMIN CONTROL

**Intern Name:** Muhammad Immad  
**Intern ID:** ZYNVEX-CERT-0613  
**Project Name:** QuickServe  
**Submission Date:** August 21, 2026  

---

### 1. Module Overview
Module 4 finalized the staff portals. This included developing the Kitchen Display System (KDS) featuring Kanban order tracking columns, building the admin menu manager with full database CRUD functionalities, and creating a feedback manager for reviews and complaints.

### 2. Core Deliverables Met
1. **Kitchen Kanban Board:** Designed the `/kitchen` view with three statuses: Pending, Preparing, and Ready. Orders move across columns in real-time.
2. **Kitchen ETA Broadcast:** Integrated action buttons inside the KDS. Transitioning an order to "Preparing" automatically calculates a +15 minute completion timestamp and writes it back to Supabase.
3. **Admin Analytics Panel:** Built dynamic dashboards calculating key business indicators (Total Revenue, Active Menu Items, Pending Orders).
4. **Full CRUD Menu Management:** Built `/admin/menu` enabling management of menu entries (Add, Edit, Toggle availability, Delete) directly from the browser.
5. **Reviews & Complaints Dashboard:** Built `/admin/reviews` to display customer feedback in real-time, automatically flagging complaints for manager attention.

### 3. Key Files & Architecture
*   `src/app/kitchen/page.tsx`: Kitchen display system with drag-free column transitions and status updates.
*   `src/app/admin/page.tsx`: Owner analytics landing page.
*   `src/app/admin/menu/page.tsx`: CRUD interface for item catalogs.
*   `src/app/admin/reviews/page.tsx`: Review dashboard with complaint flags.
*   `src/app/admin/layout.tsx`: Layout with permanent side navigation and secure sign-out.

### 4. Verification & Testing
*   **Kitchen to Customer Pipeline:** Successfully verified that marking an order "Preparing" in `/kitchen` immediately writes the ETA and updates the customer `/order/[id]` countdown.
*   **CRUD Validation:** Adding or modifying menu items inside the admin dashboard shows instant updates on the customer `/menu` catalog.
