# ⚙️ Polostore API - Backend Core

![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=black)
![Status](https://img.shields.io/badge/Status-Work_In_Progress-warning?style=for-the-badge)

## 🧠 Overview

This repository contains the backend infrastructure for the Polostore e-commerce platform. Built on the **Laravel** framework, it provides a secure, fast, and scalable RESTful API designed to serve the React frontend client. 

The architecture strictly follows MVC principles and Clean Code practices, ensuring complex business rules—like custom apparel pricing and multi-item orders—are handled securely server-side.

---

## 🗄️ Database Architecture (Entity-Relationship Planning)

The relational database is carefully modeled using **PostgreSQL (hosted on Neon Serverless)** to support a highly scalable e-commerce ecosystem. This allows for advanced JSONB storage for our custom canvas configurations. Core entities include:

* **`users`:** Authentication, authorization, and profile management.
* **`products` & `variants`:** Base garments available for customization.
* **`orders`:** Order tracking, status management, and total calculation.
* **`order_items`:** Granular details of customized items (storing JSON/JSONB references to the user's canvas design, colors, and uploaded assets).
* **`user_addresses`:** Managing multiple shipping/billing addresses per user.
* **`saved_cards`:** Secure tokenization references for future purchases (PCI-DSS compliant approach).

---

## 🔌 Planned API Endpoints (Draft)

### Authentication
* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Catalog & Designer
* `GET /api/v1/products` - Retrieve base garments.
* `POST /api/v1/uploads` - Secure endpoint for user-uploaded custom images.

### Cart & Checkout
* `POST /api/v1/orders` - Submit a final customized order.
* `POST /api/v1/checkout/intent` - Initialize payment gateway session.

---

## 🔒 Security Measures Planned
* API routing protected via Laravel Sanctum (Token-based authentication).
* Strict input validation using Laravel Form Requests.
* Rate limiting to prevent brute-force attacks.
* CORS configuration specifically whitelisting the frontend domain.

## 🛠️ Setup Instructions
*(Coming soon once initial migrations are finalized).*

## 🔒 Security Measures Planned
* API routing protected via Laravel Sanctum (Token-based authentication).
* Strict input validation using Laravel Form Requests.
* Rate limiting to prevent brute-force attacks.
* CORS configuration specifically whitelisting the frontend domain.

## 🛠️ Setup Instructions
*(Coming soon once initial migrations are finalized).*
