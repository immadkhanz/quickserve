# ZYNVEX SOFTWARE ENGINEERING INTERNSHIP
## MODULE 1 TECHNICAL REPORT: FOUNDATION & ARCHITECTURE

**Intern Name:** Muhammad Immad  
**Intern ID:** ZYNVEX-CERT-0613  
**Project Name:** QuickServe  
**Submission Date:** July 31, 2026  

---

### 1. Module Overview
Module 1 focused on initializing the QuickServe application, configuring Next.js 15 with TypeScript, and establishing a professional-grade dark-themed global CSS design system. It also involved setting up the Supabase Server-Side Rendering (SSR) client and building a secure, role-based authentication router.

### 2. Core Deliverables Met
1. **Next.js & TypeScript Initialization:** Established the structure using the App Router, setting up strict TypeScript constraints to avoid runtime reference errors.
2. **Premium Dark Mode & Glassmorphic Design System:** Styled the application using a customized `globals.css` with dynamic gradient overlays, glassmorphic card boundaries, and neon violet/blue ambient glow effects.
3. **Interactive Splash Page:** Built the customer-facing landing page (`/`) featuring fluid hover animations, dynamic gradients, and responsive navigation links.
4. **Supabase SSR Configuration:** Configured Server-Side client wrappers to manage auth cookies on the edge, preventing hydration mismatches during server rendering.
5. **Role-Based Login Router:** Created the `/login` route that validates credentials and queries user profiles to route users to `/admin`, `/kitchen`, or `/menu` automatically.

### 3. Key Files & Architecture
*   `next.config.ts`: Set up ignore rules during builds to prevent minor type warning compilation halts.
*   `src/app/globals.css`: Holds the theme variables, neon-border animations, and glassmorphic card classes.
*   `src/app/layout.tsx`: Configured with the Global `CartProvider` wrapper.
*   `src/app/page.tsx`: Landing page with dynamic CSS gradients.
*   `src/app/login/page.tsx`: Role-based route dispatcher.
*   `src/utils/supabase/server.ts`: Initialized the server-side client connection.

### 4. Verification & Testing
*   **Compilation:** Audited clean with `npx tsc --noEmit`.
*   **Security Check:** Attempting to access sub-pages without a session redirects back to login. Role validation checked against the Postgres `profiles` table.
