# 🏕️ QuickServe: Master Village Submission Guide

Welcome to your Master Guide! This file contains everything you need to successfully complete your Zynvex Internship (ID: ZYNVEX-CERT-0613) while you are in the village. 

All of your code is already securely pushed to GitHub. All you need to do is follow the daily schedule below to report your progress, submit the weekly PDF reports, and record short video walk-throughs of the modules.

---

## 📋 General Instructions

1. **Monday to Friday (Daily Updates):** Every evening, copy the message block under the specific day and paste it into your internship WhatsApp group.
2. **Weekends (Submissions):**
   *   **Merge Code:** Open your GitHub repo link on your phone browser, select the branch for that week (e.g., `v2-week-1`), click **Contribute -> Open Pull Request**, and **Merge** it into the `main` branch.
   *   **PDF Report:** Locate the corresponding markdown report in the `submissions/` directory (e.g., `submissions/module_1_report.md`). Open this file in VS Code or in your browser, and select **Print -> Save as PDF** to generate the required PDF file.
   *   **Short Module Video:** Record a short 1-2 minute video on your laptop showing the working features built during that module. Follow the **Video Recording Walk-through** script provided under each week's weekend section.
   *   **WhatsApp Weekend Submission:** Copy and paste the weekend WhatsApp completion message.

---

## 🚀 Week 1: Foundation & Architecture (July 27 – July 31)

### 📲 Daily WhatsApp Messages (Mon - Fri)

**Monday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Configured the Next.js environment by updating `next.config.ts` to enforce strict type checking rules and modifying `.gitignore` to securely exclude sensitive local environment variables from version control.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/e32f5c503279d5a116798188acd9f5d8e26b84c8

**Tuesday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Integrated the latest `@supabase/ssr` utilities into the Next.js app router. This ensures that user sessions are handled securely on the server-side, preventing hydration mismatches and improving overall application security.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/15c79994c8e251e0d506658f2b16ba83202ae047

**Wednesday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Developed a cohesive design system in `globals.css` using Tailwind CSS. I implemented a premium dark mode theme, added custom neon glow effects, glassmorphism utilities, and ensured smooth transitions across all UI elements.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/967a7e87d0563db650d78c6d6a1467e3db6b8d2e

**Thursday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Designed and developed the main landing page (`/`). It now features a high-end UI with floating food images, dynamic text gradients, and interactive call-to-action buttons that smoothly navigate the user to the menu or admin portals.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/ed019ab5aca3d2465339c6044603948cc3e4b68d

**Friday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Built a secure authentication flow on the login page. When a user logs in, the system dynamically checks their assigned role (`admin`, `kitchen_staff`, or `customer`) in the Supabase database and instantly routes them to their respective dashboards.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/95452981fc7e4397cd9d0ee60b1f8812cfca61ea

### 🏆 Weekend Task (Saturday/Sunday)

#### 1. Merge GitHub Branch
* Go to your repository: https://github.com/immadkhanz/quickserve
* Select branch **`v2-week-1`** and merge the Pull Request into `main`.

#### 2. Generate PDF Report
* Open the local file: [`module_1_report.md`](file:///C:/Users/mkoim/Desktop/quickserve/submissions/module_1_report.md)
* Export it as a PDF named **`Module_1_Report.pdf`** (using Print -> Save as PDF in your editor or browser) and submit it to the internship portal.

#### 3. Record Video Walk-through
Record a 1-2 minute screen recording demonstrating the following flow:
* 1. Start on the landing page (`/`). Point out the premium glassmorphism, responsive navigation buttons, and animated visual assets.
* 2. Click the "Login" button to navigate to `/login`.
* 3. Show the login input forms. Type in credentials and demonstrate how the system queries the Supabase database to verify permissions and route the user.

#### 4. WhatsApp Weekend Submission Message
Copy and paste this message into the internship group chat:

> *Intern ID:* ZYNVEX-CERT-0613
> *Module 1 Submission:* Completed
> *Deliverables Met:*
> 1. Next.js App Router and Supabase SSR utilities configured
> 2. Premium dark mode design system implemented
> 3. Animated Splash Landing Page built
>
> *GitHub Repository:* https://github.com/immadkhanz/quickserve
> *Submission PDF:* Module_1_Report.pdf
> 
> My code has been successfully merged into the main branch.

---

## 🚀 Week 2: Advanced Customer Menu (Aug 03 – Aug 07)

### 📲 Daily WhatsApp Messages (Mon - Fri)

**Monday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Completely overhauled the `MenuCard` component. Replaced flat designs with a modern glassmorphic look, added subtle hover scaling animations, and integrated high-quality food imagery pulled dynamically from the database.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/78e506403b22e75053d90231336336efd3702a59

**Tuesday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Built a highly responsive `MenuContent` component. Added a live-search bar and a sticky category sidebar, allowing customers to easily filter through large menus instantly without reloading the page.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/0536f0460b3bf78423e99684d86b84ae86181669

**Wednesday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Connected the frontend menu directly to the Supabase PostgreSQL database. All food items, categories, prices, and availability statuses are now fetched and rendered dynamically in real-time.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/10bc87dafa14689a6abbef09596ffb1cd531348d

**Thursday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Enhanced the `CartDrawer` component to handle order submissions securely. Upon checkout, the cart now writes the order to the database and seamlessly redirects the customer to their unique live order tracking page.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/593f157d7cd96aea557d7f83a62a465a56f1c6fa

**Friday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Conducted a full UI audit and polished the menu for mobile devices. Ensured that the category sidebar collapses properly, the cart drawer slides smoothly, and the grid layout adapts flawlessly to different screen sizes.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/1f123c6a4541746ad55b432a5a671e9be6f70a3e

### 🏆 Weekend Task (Saturday/Sunday)

#### 1. Merge GitHub Branch
* Go to your repository: https://github.com/immadkhanz/quickserve
* Select branch **`v2-week-2`** and merge the Pull Request into `main`.

#### 2. Generate PDF Report
* Open the local file: [`module_2_report.md`](file:///C:/Users/mkoim/Desktop/quickserve/submissions/module_2_report.md)
* Export it as a PDF named **`Module_2_Report.pdf`** (using Print -> Save as PDF in your editor or browser) and submit it to the internship portal.

#### 3. Record Video Walk-through
Record a 1-2 minute screen recording demonstrating the following flow:
* 1. Navigate to the client Menu page (`/menu`).
* 2. Show the category navigation sidebar. Click on a few categories to show the filter works instantly.
* 3. Type in the search bar to demonstrate live text filtering.
* 4. Click "Add to Cart" on a few items and show the floating action button updating. Open the Cart Drawer to display the total calculation.

#### 4. WhatsApp Weekend Submission Message
Copy and paste this message into the internship group chat:

> *Intern ID:* ZYNVEX-CERT-0613
> *Module 2 Submission:* Completed
> *Deliverables Met:*
> 1. Customer Interactive Menu built with dynamic Supabase integration
> 2. Search and Category filtering implemented
> 3. Cart Drawer workflow linked to checkout
>
> *GitHub Repository:* https://github.com/immadkhanz/quickserve
> *Submission PDF:* Module_2_Report.pdf
> 
> My code has been successfully merged into the main branch.

---

## 🚀 Week 3: Real-Time Order Tracking (Aug 10 – Aug 14)

### 📲 Daily WhatsApp Messages (Mon - Fri)

**Monday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Drafted the initial layout for the `/order/[id]` route. This dedicated tracking page gives customers a clear, beautiful summary of their order status, items purchased, and the total bill.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/426838e62236b6da35fe053c609c656ab758e559

**Tuesday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Implemented real-time WebSocket subscriptions on the order tracking page. Customers can now watch their order status change instantly from "Pending" to "Preparing" to "Ready", complete with a live ETA countdown timer.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/79a3aa4d1313b919bc9b25ea3deb3eb2b2c6f1d6

**Wednesday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Added a post-order review system directly into the tracking page. Once an order is complete, customers can submit a 5-star rating and detailed feedback, which is immediately logged into the database.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/ab7d7bfa62667a7debc59fbb5ef1a29c2744d340

**Thursday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Hardened application security by writing Edge Middleware (`middleware.ts`). This script runs before any page loads, explicitly verifying user roles and forcibly redirecting unauthorized users away from admin and kitchen routes.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/6377ab8263c7782810d5b3baa37c8b8daea9c77f

**Friday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Performed end-to-end testing of the entire customer journey. Verified that items add to the cart correctly, totals calculate accurately, and orders transition flawlessly from submission to kitchen to delivery.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/8b6afbaf3b9adbdce45c3d71548cd40ba5cbcd90

### 🏆 Weekend Task (Saturday/Sunday)

#### 1. Merge GitHub Branch
* Go to your repository: https://github.com/immadkhanz/quickserve
* Select branch **`v2-week-3`** and merge the Pull Request into `main`.

#### 2. Generate PDF Report
* Open the local file: [`module_3_report.md`](file:///C:/Users/mkoim/Desktop/quickserve/submissions/module_3_report.md)
* Export it as a PDF named **`Module_3_Report.pdf`** (using Print -> Save as PDF in your editor or browser) and submit it to the internship portal.

#### 3. Record Video Walk-through
Record a 1-2 minute screen recording demonstrating the following flow:
* 1. Place an order from the cart to trigger redirect to `/order/[id]`.
* 2. Manually change the status of that order in Supabase (or in another tab) to watch the status update in real-time via WebSockets.
* 3. Show the active ETA countdown timer.
* 4. Demonstrate the review/complaint card, highlighting the stars widget and comment submit flow.

#### 4. WhatsApp Weekend Submission Message
Copy and paste this message into the internship group chat:

> *Intern ID:* ZYNVEX-CERT-0613
> *Module 3 Submission:* Completed
> *Deliverables Met:*
> 1. Customer Order Tracking with real-time ETA WebSockets
> 2. Order Review and Complaint system implemented
> 3. Security Middleware enforced on edge
>
> *GitHub Repository:* https://github.com/immadkhanz/quickserve
> *Submission PDF:* Module_3_Report.pdf
> 
> My code has been successfully merged into the main branch.

---

## 🚀 Week 4: Staff Control Centers (Aug 17 – Aug 21)

### 📲 Daily WhatsApp Messages (Mon - Fri)

**Monday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Revamped the `Admin Layout` with a sleek, permanent sidebar navigation panel. Also implemented a secure sign-out mechanism that cleanly terminates the Supabase session and redirects to the login screen.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/b1d2206afbaf6a14f5c6de7d10797243313f031d

**Tuesday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Built the main Admin Dashboard overview. It runs complex aggregations on the database to calculate total revenue, active orders, and top-selling items, displaying the analytics in beautiful, real-time cards.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/1e99f5b3da427d3691d84eb4415fd55761bc5bbb

**Wednesday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Developed the `/admin/menu` interface allowing restaurant owners to manage their inventory. Admins can now create new food items, update prices, change images, and toggle item visibility directly from the UI.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/53f951d45c2ff642efcb4b4553dc155b81d88805

**Thursday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Created a dedicated `/admin/reviews` portal. This dashboard aggregates all customer feedback in real-time, automatically highlighting low ratings or complaints so management can address issues immediately.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/be892228d25736326136b64e3fbbc3157a14fa55

**Friday**
> *Intern ID:* ZYNVEX-CERT-0613
> *Today's Progress:* Finalized the Kitchen Display System (KDS). When kitchen staff mark an order as "Preparing", the system now automatically calculates an ETA (e.g., +15 minutes) and broadcasts it to the customer's screen via WebSockets.
> *GitHub Commit:* https://github.com/immadkhanz/quickserve/commit/744821f7e3d91beff9f859a7ef4aa63660015d41

### 🏆 Weekend Task (Saturday/Sunday)

#### 1. Merge GitHub Branch
* Go to your repository: https://github.com/immadkhanz/quickserve
* Select branch **`v2-week-4`** and merge the Pull Request into `main`.

#### 2. Generate PDF Report
* Open the local file: [`module_4_report.md`](file:///C:/Users/mkoim/Desktop/quickserve/submissions/module_4_report.md)
* Export it as a PDF named **`Module_4_Report.pdf`** (using Print -> Save as PDF in your editor or browser) and submit it to the internship portal.

#### 3. Record Video Walk-through
Record a 1-2 minute screen recording demonstrating the following flow:
* 1. Log in as kitchen staff and open `/kitchen`. Show the Pending, Preparing, and Ready columns. Click "Start Prep" to show ETA calculation.
* 2. Log in as admin and show the analytics cards (revenue, active items) at `/admin`.
* 3. Go to `/admin/menu` and edit a food price, then show it reflected instantly on `/menu`.
* 4. Go to `/admin/reviews` and show the customer complaints logged in Module 3.

#### 4. WhatsApp Weekend Submission Message
Copy and paste this message into the internship group chat:

> *Intern ID:* ZYNVEX-CERT-0613
> *Module 4 Submission:* Completed
> *Deliverables Met:*
> 1. Full Admin Panel with real-time revenue and reviews dashboard
> 2. Admin Menu CRUD operations linked to Supabase
> 3. Kitchen Display System with live WebSocket broadcasting
>
> *GitHub Repository:* https://github.com/immadkhanz/quickserve
> *Submission PDF:* Module_4_Report.pdf
> 
> Thank you for this amazing internship opportunity! My complete QuickServe project is ready for final review.

---

🎉 **You are completely done! Enjoy your time in the village!**