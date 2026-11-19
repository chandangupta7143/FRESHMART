# FRESHMART

A modern, responsive grocery storefront homepage built with React 19, Tailwind CSS v4, and Framer Motion.

Designed with an editorial forest-green and warm-cream aesthetic, focusing on clean typography, smooth transitions, and accessible UI.

---

## Features

- **Curated Catalogue:** 18 grocery essentials across 6 everyday departments (Fruits, Vegetables, Dairy, Bakery, Beverages, and Pantry).
- **Instant Search & Filtering:** Filter products by category or search by name in real time with synchronized category item counts.
- **Responsive Layout:** Optimized for mobile phones, tablets, and wide desktop screens with a slide-over navigation drawer on smaller viewports.
- **Accessible UI:** Follows semantic HTML, visible keyboard focus rings, sequential heading order, and WCAG AA contrast standards.
- **Smooth Animations:** Subtle entrance and hover effects powered by Framer Motion that automatically respect system reduced-motion preferences.
- **Newsletter Signup:** Client-side validation with instant confirmation and focus management.

---

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chandangupta7143/FRESHMART.git
   cd FRESHMART
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`.

### Production Build

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
FRESHMART/
├── public/                 # Static assets and icons
├── src/
│   ├── components/
│   │   ├── home/           # Hero, Trust, Category, Promo, Benefits, Newsletter
│   │   ├── layout/         # AnnouncementBar, Navbar, MobileNav, Footer
│   │   └── products/       # ProductCard, ProductGrid, FilterBar, EmptyState
│   ├── data/
│   │   ├── categories.js   # 6 grocery department definitions
│   │   └── products.js     # 18 static grocery products with pricing & units
│   ├── hooks/
│   │   └── useProductFilters.js # Category and search filtering logic
│   ├── App.jsx             # Root application assembly
│   ├── index.css           # Tailwind v4 theme tokens and global base styles
│   └── main.jsx            # Application entry point
├── package.json
└── vite.config.js
```

---

## Author

Developed by **Chandan Gupta** ([@chandangupta7143](https://github.com/chandangupta7143)).
