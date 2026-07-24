# ZYNVEX SOFTWARE ENGINEERING INTERNSHIP
## MODULE 3 TECHNICAL REPORT: REAL-TIME ORDER TRACKING & SECURITY

**Intern Name:** Muhammad Immad  
**Intern ID:** ZYNVEX-CERT-0613  
**Project Name:** QuickServe  
**Submission Date:** August 14, 2026  

---

### 1. Module Overview
Module 3 established the real-time pipeline between the customer, the database, and the kitchen. This included developing order status workflows, setting up Supabase Realtime listeners, creating the customer order tracking interface with live countdown timers, and building a post-order review system.

### 2. Core Deliverables Met
1. **Supabase Order Submission:** Linked checkout submissions to create rows in `orders` and `order_items` tables with transaction integrity.
2. **WebSocket Realtime State:** Configured Realtime listeners (`supabase.channel()`) on the customer tracking page. Changes to order status trigger immediate state updates.
3. **Live countdown ETA:** Configured live timers reflecting `estimated_ready_time` sent by the kitchen, displaying accurate remaining minutes.
4. **Middleware Security Shield:** Implemented Edge Middleware (`middleware.ts`) to validate JWT sessions and enforce role checking, blocking unauthorized access to `/admin` and `/kitchen`.
5. **Rating & Feedback Portal:** Created an interactive digital receipt containing a 5-star rating widget and feedback input for immediate post-meal complaints.

### 3. Key Files & Architecture
*   `src/app/order/[id]/page.tsx`: Live order tracking and post-order feedback portal.
*   `src/utils/supabase/middleware.ts`: Validates cookies on the Edge and handles unauthorized redirection.
*   `src/context/CartContext.tsx`: Manages cart state locally until checkout submission.

### 4. Verification & Testing
*   **Edge Routing:** Visiting `/admin` or `/kitchen` as a customer successfully triggers a 307 redirect to `/login`.
*   **WebSocket Response:** Changing order statuses inside the Supabase table UI triggers immediate customer screen updates without page refreshes.
