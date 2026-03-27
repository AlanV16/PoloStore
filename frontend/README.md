# ✨ Polostore - Advanced E-commerce & Custom Apparel Designer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Phase_1_Complete-success?style=for-the-badge)

## 🚀 The Vision: Next-Generation Print-on-Demand

In the competitive landscape of online retail, personalization is paramount. **Polostore** is a highly scalable, frontend-first B2B/B2C e-commerce platform built to solve the complex challenge of providing a seamless, real-time custom apparel design experience in the browser. 

The crown jewel of this architecture is the **Interactive Design Module**, which translates complex canvas manipulations, drag-and-drop interactions, and layered rendering into an intuitive, buttery-smooth user experience. Built with performance and maintainability in mind, this project stands as a testament to modern React engineering.

---

## 💎 Key Features

### 🎨 The Killer Feature: Interactive Apparel Designer
Engineered for performance and pixel-perfect accuracy, the designer module allows end-users to become creators.
* **Dynamic Canvas Manipulation:** Users can seamlessly upload custom images, add text layers, and modify typography properties in real-time.
* **Drag & Drop Architecture:** Smooth manipulation of elements across the canvas, powered by highly optimized custom components (`DraggableElement.jsx`).
* **Real-time Attribute Management:** Instantly change garment colors, styles, and view a live 3D-like rendering via the `PreviewSidebar`.
* **State-driven Properties:** The `PropertiesPanel` intelligently adapts to the currently selected layer, providing context-aware tooling.

### 🛒 Advanced E-commerce Capabilities
* **Frictionless UX:** Skeleton loading states, smooth page transitions, and responsive sidebars (`CartSidebar`, `Dashboard`).
* **State Management:** Robust React Context API implementation for shopping cart synchronization and UI state.
* **Modular Admin Dashboard:** Ready-to-use business management interfaces including order tracking, user profiles, and catalog configuration.

---

## 🏗️ Frontend Architecture & Scalability

The codebase follows enterprise-grade organizational patterns to ensure long-term maintainability, team scaling, and separation of concerns.

```text
src/
├── components/       # Highly cohesive, loosely coupled UI building blocks
│   ├── designer/     # Complex domain-specific logic for the canvas editor
│   ├── dashboard/    # Admin and user account management views
│   ├── layout/       # Structural shell components (Nav, Footer, Transitions)
│   └── ui/           # Reusable atomic presentation components
├── context/          # Global application state management (e.g., CartContext)
├── hooks/            # Extracted lifecycle and business logic (e.g., useDesigner)
├── pages/            # Top-level route assemblies mapping to URLs
└── utils/            # Pure functions and design system utilities