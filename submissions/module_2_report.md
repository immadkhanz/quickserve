# ZYNVEX SOFTWARE ENGINEERING INTERNSHIP
## MODULE 2 TECHNICAL REPORT: ADVANCED CUSTOMER MENU

**Intern Name:** Muhammad Immad  
**Intern ID:** ZYNVEX-CERT-0613  
**Project Name:** QuickServe  
**Submission Date:** August 7, 2026  

---

### 1. Module Overview
Module 2 focused on creating the dynamic client-facing menu. This involved rendering food categories and items dynamically from the Supabase PostgreSQL database, adding search and filter components, designing a sliding cart drawer system, and building the dynamic QR Code generation panel.

### 2. Core Deliverables Met
1. **Dynamic Database Fetching:** Connected the menu directly to Supabase, pulling real-time prices, food images, descriptions, and category associations.
2. **Glassmorphic Menu UI:** Designed a responsive grid of `MenuCard` items utilizing ambient drop shadows, clear availability badges, and micro-hover zoom effects.
3. **Advanced Filtering & Search:** Built the `MenuContent` client-side sidebar that lets users filter by category instantly and query items with zero input lag.
4. **Mobile Cart Drawer:** Built a slide-over Cart drawer component that aggregates selections, updates item counts on a floating action button, and calculates real-time sub-totals.
5. **QR Code Generator:** Built the admin-side QR panel which generates dynamic QR codes representing table numbers (e.g. `localhost:3000/menu?table=5`).

### 3. Key Files & Architecture
*   `src/app/menu/page.tsx`: Renders the main customer view, passing dynamic database objects to child components.
*   `src/components/MenuCard.tsx`: Individual food cards containing checkout options.
*   `src/components/MenuContent.tsx`: Client-side logic for the category filtering and search.
*   `src/components/CartDrawer.tsx`: Sidebar interface showing cart contents and total price.
*   `src/app/admin/qr/page.tsx`: Contains the admin QR Code generation tool.

### 4. Verification & Testing
*   **Search performance:** Verified text querying matches items across all categories instantly.
*   **Responsiveness:** Tested cart sidebar sliding behavior across mobile breakpoints (375px up to 1024px).
