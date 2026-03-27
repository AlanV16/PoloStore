# ✨ Polostore - Full-Stack E-Commerce & Print-on-Demand Platform

![Architecture](https://img.shields.io/badge/Architecture-Decoupled_Client/Server-success?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-React_%7C_Vite-20232A?style=for-the-badge&logo=react)
![Backend](https://img.shields.io/badge/Backend-PHP_%7C_Laravel-FF2D20?style=for-the-badge&logo=laravel)

## 🌐 System Overview

**Polostore** is an enterprise-grade, custom apparel e-commerce platform built with a decoupled architecture. It seamlessly integrates a highly interactive, browser-based design tool with a robust, scalable backend system capable of handling complex order management and transactions.

The project is divided into two main environments to ensure scalability, security, and independent deployment cycles:

### 1. [Frontend Client (React)](./frontend/README.md) - *Completed (Phase 1)*
A high-performance Single Page Application (SPA) featuring an interactive Canvas-based designer module. It allows users to manipulate text, upload images, change garment colors in real-time, and manage their shopping cart with a frictionless UX.

### 2. [Backend API (Laravel)](./backend/README.md) - *In Active Development*
A secure, scalable RESTful API built with PHP and Laravel. It acts as the central brain of the operation, handling business logic, relational database management (Products, Orders, Addresses, Payment Methods), and secure checkout flows.

---

## 🏗️ High-Level Architecture

```mermaid
graph LR
    Client[Frontend: React SPA] <--> |JSON REST API| Server[Backend: Laravel API]
    Server <--> Database[(MySQL / PostgreSQL)]
    Server <--> Payment[Stripe / PayPal Gateway]
