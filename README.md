# Jalashay Resort - Web Portal

A premium, state-of-the-art web application built for **Jalashay Resort**—a serene backwater sanctuary offering palm-fringed waters, heritage stays, wellness treatments, and lakeside weddings.

## Deployment Status
* **Current Version:** `v3.0.0`
* **Status:** Connected to the `main` branch and deployed to production.

---

## Tech Stack
* **Framework:** Next.js 16 (Turbopack Enabled)
* **Styling:** Tailwind CSS v4 & custom HSL/OKLCH color themes (Cream & Gold aesthetics)
* **Data Fetching:** TanStack React Query (v5)
* **Components:** Radix UI primitives & shadcn Dialog layout
* **Payment Gateway:** Razorpay Hosted Checkout Integration

---

## Features
1. **Interactive Booking Enquiries**: Seamless modal form integrated with a global context manager submitting to the resort's back-office server via React Query.
2. **Responsive Media Showcase**: Custom 4-column responsive grid layout showing a collection of local resort images and videos.
3. **Smooth Scroll Routing**: Enhanced page transition behaviors respect CSS smooth scrolling on single-page targets.
4. **Mobile Responsiveness**: Dynamic hamburger menu and drop-down drawer containing all route anchors.
5. **Mobile-Ready Parallax**: Custom scroll-relative JavaScript translate offset container for the Call-to-Action section.

---

## Getting Started

### 1. Configure Environments
Create a `.env.local` or edit `.env` in the root folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+918040001212
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build Production Bundle
```bash
npm run build
```
